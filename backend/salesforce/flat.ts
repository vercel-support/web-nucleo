import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';
import { parse } from 'node-html-parser';
import { salesforceClient } from './index';
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

  private flatObject: IStringToAnyDictionary;
  public name?: string;
  public address?: string;
  public picture_urls?: string[];
  public description?: string;
  public year_construction?: string;
  public year_reform?: string;

  constructor(flatObject: IStringToAnyDictionary) {
    this.flatObject = flatObject;
  }

  async init(): Promise<void> {
    this.name = this.flatObject['Name'];
    this.address = this.flatObject['Direccion__c'];
    this.picture_urls = await this.preprocess_pictures(
      this.flatObject['Fotos__c']
    );
    this.description = this.flatObject['Descripcion__c'];
    this.year_construction = this.flatObject['Ano_costruccion__c'];
    this.year_reform = this.flatObject['Ano_reforma__c'];
  }

  async preprocess_pictures(pictures_html: string): Promise<string[]> {
    if (pictures_html == null) {
      return [];
    }
    const elements = parse(pictures_html);
    const urls = elements
      .querySelectorAll('img')
      .map((img) => img.attributes.src);

    return await Promise.all(
      urls.map((url) => {
        return salesforceClient.fetchBase64ImageSource(
          url,
          Flat.objectName,
          'Fotos__c'
        );
      })
    );
  }

  static fromJSON(json: any): Flat {
    const flat = Object.create(Flat.prototype);
    return Object.assign(flat, json);
  }

  static deserialize_results(json: string): Flat[] {
    const objs = JSON.parse(json);
    return objs.map((obj) => {
      return Flat.fromJSON(obj);
    });
  }

  static serialize_results(flats: Flat[]): string {
    return JSON.stringify(flats);
  }

  static async getFlats() {
    const records = await salesforceClient.fetchAllObjectInstances(
      Flat.objectName,
      Flat.fields
    );
    const flats = records.map((record) => new Flat(record));
    await Promise.all(flats.map((flat) => flat.init()));
    return flats;
  }
}
