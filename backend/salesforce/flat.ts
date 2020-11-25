import { retry } from 'async-retry-decorator';
import {
  Client as GoogleMapsClient,
  LatLngLiteral,
} from '@googlemaps/google-maps-services-js';

import { IFlat } from '../../common/model/flat.model';
import { getSalesforceClient } from '.';
import { computeMapAreaId } from '../geo';
import { asyncMemoize } from '../helpers';

const googleMapsClient = new GoogleMapsClient();

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

function capitalize(str: string): string {
  const words = str.split(' ');
  return words
    .map((word) => {
      const subwords = word.split("'");
      return subwords
        .map((subword) => {
          if (subword.length > 2) {
            return (
              subword.charAt(0).toUpperCase() + subword.toLowerCase().slice(1)
            );
          }
          return subword.toLowerCase();
        })
        .join("'");
    })
    .join(' ');
}

export default class Flat {
  public static fields = [
    'Id',
    'Name',
    'Direccion_Inmueble__c',
    'Precio_Web__c',
    'Dormitorios__c',
    'Ba_os__c',
    'M2_utiles__c',
    'Tipologia_inmueble__c',
    'Inmueble__r.Edificio__r.Provincia__c',
    'Inmueble__r.Edificio__r.Localidad__c',
    'Inmueble__r.Edificio__r.Barrio__c',
    'Descripci_n_Espa_ol__c',
    'Descripci_n_Ingl_s__c',
    'Mostrar_en_la_Web__c',
    'Ascensor__c',
    'Jardin__c',
    'Balcon__c',
    'Terraza__c',
    'Sotano__c',
    'Ano_construccion__c',
    'Ano_reforma__c',
    'StageName',
  ];
  public static objectName = 'Opportunity';

  static async preprocessPictures(entityId: string): Promise<string[]> {
    const sfClient = await getSalesforceClient();

    return sfClient.fetchAttachedImages(entityId);
  }

  static fromDict(obj: Record<string, any>): IFlat {
    return { ...obj } as IFlat;
  }

  static serialize(flats: IFlat | IFlat[]): string {
    return JSON.stringify(flats);
  }

  static async fromRecord(record: Record<string, any>): Promise<IFlat> {
    const id = record['Id'];
    const pictureUrls = await Flat.preprocessPictures(record['Id']);
    const price = record['Precio_Web__c'];
    const rooms = record['Dormitorios__c'];
    const address = record['Direccion_Inmueble__c'];
    const bathrooms = record['Ba_os__c'];
    const type = record['Tipologia_inmueble__c'];
    const sqrMeters = record['M2_utiles__c'];

    let city = null;
    let zone = null;
    let county = null;

    if (
      'Inmueble__r' in record &&
      !isNullOrUndefined(record['Inmueble__r']) &&
      'Edificio__r' in record['Inmueble__r'] &&
      !isNullOrUndefined(record['Inmueble__r']['Edificio__r'])
    ) {
      county = record['Inmueble__r']['Edificio__r']['Provincia__c'];
      city = record['Inmueble__r']['Edificio__r']['Localidad__c'];
      zone = record['Inmueble__r']['Edificio__r']['Barrio__c'];
    }

    const description_ES = record['Descripci_n_Espa_ol__c'];
    const description_EN = record['Descripci_n_Ingl_s__c'];
    const showInWebsite = record['Mostrar_en_la_Web__c'];
    const stage = record['StageName'];

    const hasElevator = record['Ascensor__c'];
    const hasGarden = record['Jardin__c'];
    const hasBalcony = record['Balcon__c'];
    const hasTerrace = record['Terraza__c'];
    const hasBasement = record['Sotano__c'];

    const yearConstruction = record['Ano_construccion__c'];
    const yearReform = record['Ano_reforma__c'];

    // TODO do proper validation using typescript class, directly in 'fromDict'
    if (
      isNullOrUndefined(id) ||
      isNullOrUndefined(pictureUrls) ||
      isNullOrUndefined(address) ||
      pictureUrls.length <= 0 ||
      isNullOrUndefined(price) ||
      isNullOrUndefined(rooms) ||
      isNullOrUndefined(type) ||
      isNullOrUndefined(stage) ||
      isNullOrUndefined(sqrMeters) ||
      isNullOrUndefined(zone) ||
      isNullOrUndefined(city) ||
      isNullOrUndefined(county) ||
      isNullOrUndefined(bathrooms) ||
      isNullOrUndefined(description_ES) ||
      isNullOrUndefined(description_EN) ||
      isNullOrUndefined(showInWebsite) ||
      showInWebsite == false ||
      stage != 'Activo'
    ) {
      return null;
    }

    const coords = await Flat.getCoordinatesFromAddress(
      address,
      zone,
      city,
      county
    );
    if (isNullOrUndefined(coords)) {
      return null;
    }

    const { lat: approximateLatitude, lng: approximateLongitude } = coords;

    const mapAreaId =
      computeMapAreaId(approximateLongitude, approximateLatitude) || undefined;

    zone = capitalize(zone);
    city = capitalize(city);
    county = capitalize(county);

    return Flat.fromDict({
      id,
      pictureUrls,
      price,
      address,
      rooms,
      bathrooms,
      type,
      sqrMeters,
      zone,
      city,
      county,
      description_ES,
      description_EN,
      showInWebsite,
      hasElevator,
      hasGarden,
      hasBalcony,
      hasTerrace,
      hasBasement,
      approximateLatitude,
      approximateLongitude,
      yearConstruction,
      yearReform,
      mapAreaId,
    });
  }

  @asyncMemoize
  static async getFlats(): Promise<IFlat[]> {
    if (
      process.env.NODE_ENV == 'development' &&
      !('USE_REAL_DATA' in process.env && process.env.USE_REAL_DATA === 'true')
    ) {
      const mockFlatsRaw = require('../../public/fixtures/flats.json');
      const mockFlats: IFlat[] = mockFlatsRaw.map(
        (flatJson: Record<string, any>) => {
          const mockFlat = Flat.fromDict(flatJson);
          const mapAreaId = computeMapAreaId(
            mockFlat.approximateLongitude,
            mockFlat.approximateLatitude
          );
          if (mapAreaId) {
            mockFlat.mapAreaId = mapAreaId;
          }
          return mockFlat;
        }
      );
      return mockFlats;
    }
    const sfClient = await getSalesforceClient();

    const records = await sfClient.fetchAllObjectInstances(
      Flat.objectName,
      Flat.fields
    );

    const flats = await Promise.all(
      records.map((record) => Flat.fromRecord(record))
    );
    return flats.filter((flat) => flat !== null);
  }

  @retry({
    retries: 10,
    onRetry: (error, attempt) => {
      console.log(
        `Retry getCoordinatesFromAddress (${attempt}) on error`,
        error.message
      );
    },
  })
  static async getCoordinatesFromAddress(
    address: string,
    zone: string,
    city: string,
    county: string
  ): Promise<LatLngLiteral> {
    const result = await googleMapsClient.geocode({
      params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        address: `${address} ${zone} ${city} ${county}`,
      },
    });
    return result.data.results[0].geometry.location;
  }
}
