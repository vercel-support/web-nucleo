import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';
import { parse } from 'node-html-parser';

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

  constructor(flatObject: IStringToAnyDictionary) {
    this.name = flatObject['Name'];
    this.address = flatObject['Direccion__c'];
    this.picture_urls = this.preprocess_pictures(flatObject['Fotos__c']);
    this.description = flatObject['Descripcion__c'];
    this.year_construction = flatObject['Ano_costruccion__c'];
    this.year_reform = flatObject['Ano_reforma__c'];
  }

  preprocess_pictures(pictures_html: string): string[] {
    if (pictures_html == null) {
      return [];
    }
    const elements = parse(pictures_html);
    return elements.querySelectorAll('img').map((img) => img.attributes.src);
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
}
