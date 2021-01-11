import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import md5 from 'blueimp-md5';

import { IContact } from '../../common/model/mailchimp/contact.model';
import { MailchimpStatus } from '../../common/model/mailchimp/enums/mailchimpStatus.enum';
import {
  Client as GoogleMapsClient,
  GeocodeResult,
} from '@googlemaps/google-maps-services-js';
import { euclideanDistance } from '../../common/helpers';
import { getOffices } from '../../backend/offices';
import { sendEmail } from '../../backend/email';

const googleMapsClient = new GoogleMapsClient();

type RequestBodyType = {
  contact: IContact;
};

export type ResponseType = {
  status: string;
};

const getLatLongFromAddress = async (
  address: string
): Promise<GeocodeResult> => {
  const result = await googleMapsClient.geocode({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      address: address,
    },
  });
  return result.data.results[0];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> => {
  const { contact } = req.body as RequestBodyType;

  if (!contact) {
    return res.status(400).json({ status: MailchimpStatus.ERROR });
  }

  const { EMAIL, FNAME, LNAME, PHONE, HADDRESS, SUBJECT } = contact;

  if (!EMAIL) {
    return res.status(400).json({ status: MailchimpStatus.ERROR });
  }

  if (HADDRESS) {
    try {
      const geoCodeResult = await getLatLongFromAddress(HADDRESS);

      const lat = geoCodeResult.geometry.location.lat;
      const long = geoCodeResult.geometry.location.lng;
      const fullAddress = geoCodeResult.formatted_address;

      if (
        !fullAddress.includes('Alicante') &&
        !fullAddress.includes('Alacant')
      ) {
        throw Error(
          'Skipping closest office email, as the address introduced is not in Alicante.'
        );
      }
      const offices = getOffices();

      let closestDistance = 999999;
      let closestOffice = null;
      for (const office of offices) {
        const officeLat = office.lat;
        const officeLong = office.long;

        const euclDistance = euclideanDistance(
          officeLat,
          officeLong,
          lat,
          long
        );
        if (euclDistance < closestDistance) {
          closestDistance = euclDistance;
          closestOffice = office;
        }
      }

      await sendEmail(
        closestOffice.email,
        'Nuevo contacto a través de la web - interés en vender piso',
        `Un nuevo usuario ha mostrado interés en vender su piso a través de inmobiliarianucleo.com. \n\n\nEmail: ${EMAIL}\nNombre y apellidos: ${FNAME}, ${LNAME}\nTeléfono: ${PHONE}\nDirección: ${HADDRESS}\nMensaje: ${SUBJECT}`
      );
    } catch (error) {
      console.error('Error trying to send email to closest office');
      console.error(error);
    }
  }

  try {
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const DATACENTER = API_KEY.split('-')[1];

    const axiosInstance = axios.create({
      baseURL: `https://${DATACENTER}.api.mailchimp.com/3.0/`,
    });

    let merge_fields: any = {};
    if (FNAME) {
      merge_fields = { ...merge_fields, FNAME };
    }
    if (LNAME) {
      merge_fields = { ...merge_fields, LNAME };
    }
    if (PHONE) {
      merge_fields = { ...merge_fields, PHONE };
    }
    if (HADDRESS) {
      merge_fields = { ...merge_fields, HADDRESS };
    }
    if (SUBJECT) {
      merge_fields = { ...merge_fields, SUBJECT };
    }
    const data = {
      email_address: EMAIL,
      status: MailchimpStatus.PENDING,
      merge_fields,
    };

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `apikey ${API_KEY}`,
      },
    };

    try {
      await axiosInstance.post(`lists/${LIST_ID}/members`, data, config);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (
        axiosError.isAxiosError &&
        axiosError.response &&
        axiosError.response.data.title === 'Member Exists'
      ) {
        data.status = MailchimpStatus.SUBSCRIBED;
        await axiosInstance.put(
          `lists/${LIST_ID}/members/${md5(EMAIL)}`,
          data,
          config
        );
      } else {
        throw error;
      }
    }

    return res.status(200).json({ status: data.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return res
        .status(axiosError.response.status)
        .json({ status: MailchimpStatus.ERROR });
    } else {
      return res.status(500).json({ status: MailchimpStatus.ERROR });
    }
  }
};

export default handler;
