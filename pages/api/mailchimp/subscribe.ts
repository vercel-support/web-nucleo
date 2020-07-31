import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import md5 from 'blueimp-md5';

import { IContact } from '../../../common/model/mailchimp/contact.model';

type RequestBodyType = {
  contact: IContact;
};

type ResponseType = {
  error: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> => {
  const { contact } = req.body as RequestBodyType;

  if (!contact) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  const { EMAIL, FNAME, LNAME, PHONE, HADDRESS } = contact;

  if (!EMAIL) {
    return res.status(400).json({ error: 'Bad Request' });
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
    const data = {
      email_address: EMAIL,
      status: 'pending',
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
        await axiosInstance.put(
          `lists/${LIST_ID}/members/${md5(EMAIL)}`,
          data,
          config
        );
      } else {
        throw error;
      }
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return res
        .status(axiosError.response.status)
        .json({ error: 'Bad Request' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default handler;
