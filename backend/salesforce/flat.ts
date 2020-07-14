import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';
import { parse } from 'node-html-parser';
import { getSalesforceClient } from './index';
export default class Flat {
  public static fields = [
    'Name',
    'Direccion__c',
    'Fotos__c',
    'Descripcion__c',
    'Ano_costruccion__c',
    'Ano_reforma__c',
  ];
  public static objectName = 'Inmueble__c';

  public id: number;
  public name: string;
  public address?: string;
  public pictureUrls?: string[];
  public description?: string;
  public yearConstruction?: string;
  public yearReform?: string;

  // TODO implement
  public price?: number;
  public rooms?: number;
  public sqrMeters?: number;
  public type?: string;
  public city?: string;
  public zone?: string;

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
    const name = record['Name'];
    const address = record['Direccion__c'];
    const pictureUrls = await Flat.preprocessPictures(record['Fotos__c']);
    const description = record['Descripcion__c'];
    const yearConstruction = record['Ano_costruccion__c'];
    const yearReform = record['Ano_reforma__c'];
    return Flat.fromDict({
      name,
      address,
      pictureUrls,
      description,
      yearConstruction,
      yearReform,
    });
  }

  static async getFlats(): Promise<Flat[]> {
    const sfClient = await getSalesforceClient();

    const records = await sfClient.fetchAllObjectInstances(
      Flat.objectName,
      Flat.fields
    );
    return Promise.all(records.map((record) => Flat.fromRecord(record)));
  }
}
