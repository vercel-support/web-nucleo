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

  public name: string;
  public address?: string;
  public picture_urls?: string[];
  public description?: string;
  public year_construction?: string;
  public year_reform?: string;

  static async preprocess_pictures(pictures_html: string): Promise<string[]> {
    const sfClient = await getSalesforceClient();

    if (pictures_html == null) {
      return [];
    }
    const elements = parse(pictures_html);
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

  static deserialize_results(json: string): Flat[] {
    const objs = JSON.parse(json);
    return objs.map((obj) => {
      return Flat.fromDict(obj);
    });
  }

  static serialize_results(flats: Flat[]): string {
    return JSON.stringify(flats);
  }

  static async fromRecord(record: IStringToAnyDictionary): Promise<Flat> {
    const name = record['Name'];
    const address = record['Direccion__c'];
    const picture_urls = await Flat.preprocess_pictures(record['Fotos__c']);
    const description = record['Descripcion__c'];
    const year_construction = record['Ano_costruccion__c'];
    const year_reform = record['Ano_reforma__c'];
    return Flat.fromDict({
      name,
      address,
      picture_urls,
      description,
      year_construction,
      year_reform,
    });
  }

  static async getFlats() {
    const sfClient = await getSalesforceClient();

    const records = await sfClient.fetchAllObjectInstances(
      Flat.objectName,
      Flat.fields
    );
    return Promise.all(records.map((record) => Flat.fromRecord(record)));
  }
}
