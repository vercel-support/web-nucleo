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
    'Direccion_Inmueble__c',
    'Precio_Web__c',
    'Fotos__c',
    'Dormitorios__c',
    'Ba_os__c',
    'M2_utiles__c',
    'Tipologia_inmueble__c',
    'Localidad_Inmueble__c',
    'Provincia__c',
    'Descripci_n_Espa_ol__c',
    'Descripci_n_Ingl_s__c',
    'Mostrar_en_la_Web__c',
    'Ascensor__c',
    'Jardin__c',
    'Balcon__c',
    'Terraza__c',
    'Sotano__c',
    'Ano_costruccion__c',
    'Ano_reforma__c',
  ];
  public static objectName = 'Opportunity';

  public id: string;
  public name: string;
  public address: string;
  public pictureUrls: string[];
  public price: number;
  public rooms: number;
  public bathrooms: number;
  public sqrMeters: number;
  public type: string;
  public zone: string;
  public city: string;
  public description_ES: string;
  public description_EN: string;
  public showInWebsite: boolean;
  public hasElevator: boolean;
  public hasGarden: boolean;
  public hasBalcony: boolean;
  public hasTerrace: boolean;
  public hasBasement: boolean;

  public yearConstruction?: number;
  public yearReform?: number;

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
    const address = record['Direccion_Inmueble__c'];
    const pictureUrls = await Flat.preprocessPictures(record['Fotos__c']);
    const price = record['Precio_Web__c'];
    const rooms = record['Dormitorios__c'];
    const bathrooms = record['Ba_os__c'];
    const type = record['Tipologia_inmueble__c'];
    const sqrMeters = record['M2_utiles__c'];
    const zone = record['Localidad_Inmueble__c'];
    const city = record['Provincia__c'];
    const description_ES = record['Descripci_n_Espa_ol__c'];
    const description_EN = record['Descripci_n_Ingl_s__c'];
    const showInWebsite = record['Mostrar_en_la_Web__c'];

    const hasElevator = record['Ascensor__c'];
    const hasGarden = record['Jardin__c'];
    const hasBalcony = record['Balcon__c'];
    const hasTerrace = record['Terraza__c'];
    const hasBasement = record['Sotano__c'];

    const yearConstruction = record['Ano_costruccion__c'];
    const yearReform = record['Ano_reforma__c'];

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
      isnull(bathrooms) ||
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
      bathrooms,
      type,
      sqrMeters,
      zone,
      city,
      description_ES,
      description_EN,
      showInWebsite,
      hasElevator,
      hasGarden,
      hasBalcony,
      hasTerrace,
      hasBasement,
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

    const flats = await Promise.all(
      records.map((record) => Flat.fromRecord(record))
    );
    return flats.filter((flat) => flat !== null);
  }
}
