import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';
import { parse } from 'node-html-parser';
import { getSalesforceClient } from './index';

function isnull(value) {
  return value === undefined || value === null;
}
export default class Flat {
  public static fields = [
    'Id',
    'Name',
    'Direccion__c',
    'Fotos__c',
    'M2_tiles__c',
    'Tipologia_inmueble__c',
    'Dormitorios__c',
    'Localidad__c',
    'Provincia__c',
    'Descripcion_Web_ES__c',
    'Descripcion_Web_EN__c',
    'Precio_Web__c',
    'Mostrar_en_Web__c',
  ];
  public static objectName = 'Inmueble__c';

  public id: string;
  public name: string;
  public pictureUrls: string[];
  public price: number;
  public rooms: number;
  public sqrMeters: number;
  public type: string;
  public zone: string;
  public city: string;
  public address: string;
  public description: string;
  public description_ES: string;
  public description_EN: string;
  public showInWebsite: boolean;

  static async preprocessPictures(picturesHtml: string): Promise<string[]> {
    const sfClient = await getSalesforceClient();

    if (picturesHtml == null) {
      return [];
    }
    const elements = parse(picturesHtml);
    const urls = elements
      .querySelectorAll('img')
      .map((img) => img.attributes.src);

    return await Promise.all(
      urls.map((url) => {
        return sfClient.fetchBase64ImageSource(
          url,
          Flat.objectName,
          'Fotos__c'
        );
      })
    );
  }

  static fromDict(obj: IStringToAnyDictionary): Flat {
    const flat = Object.create(Flat.prototype);
    return Object.assign(flat, obj);
  }

  static deserializeResult(json: string): Flat {
    const obj = JSON.parse(json);
    return Flat.fromDict(obj);
  }

  static deserializeResults(json: string): Flat[] {
    const objs = JSON.parse(json);
    return objs.map((obj) => {
      return Flat.fromDict(obj);
    });
  }

  static serialize(flats: Flat | Flat[]): string {
    return JSON.stringify(flats);
  }

  static async fromRecord(record: IStringToAnyDictionary): Promise<Flat> {
    const id = record['Id'];
    const name = record['Name'];
    const address = record['Direccion__c'];
    const pictureUrls = await Flat.preprocessPictures(record['Fotos__c']);
    const price = record['Precio_Web__c'];
    const rooms = record['Dormitorios__c'];
    const type = record['Tipologia_inmueble__c'];
    const sqrMeters = record['M2_tiles__c'];
    const zone = record['Localidad__c'];
    const city = record['Provincia__c'];
    const description_ES = record['Descripcion_Web_ES__c'];
    const description_EN = record['Descripcion_Web_EN__c'];
    const showInWebsite = record['Mostrar_en_Web__c'];

    // TODO do proper validation using typescript class, directly in 'fromDict'
    if (
      isnull(id) ||
      isnull(name) ||
      isnull(address) ||
      isnull(pictureUrls) ||
      isnull(price) ||
      isnull(rooms) ||
      isnull(type) ||
      isnull(sqrMeters) ||
      isnull(zone) ||
      isnull(city) ||
      isnull(description_ES) ||
      isnull(description_EN) ||
      isnull(showInWebsite) ||
      showInWebsite == false
    ) {
      return null;
    }

    return Flat.fromDict({
      id,
      name,
      address,
      pictureUrls,
      price,
      rooms,
      type,
      sqrMeters,
      zone,
      city,
      description_ES,
      description_EN,
      showInWebsite,
    });
  }

  static async getFlats(): Promise<Flat[]> {
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
}
