import { Connection } from 'jsforce';

import { IStringToAnyDictionary } from '../common/model/stringToAnyDictionary.model';

export class Salesforce {
  private conn = new Connection();

  async init(
    user: string = process.env.SALESFORCE_USER,
    password: string = process.env.SALESFORCE_PASSWORD
  ): Promise<void> {
    await this.conn.login(user, password);
  }

  async fetchAllObjectInstances(
    objectName = 'Inmueble__c',
    fields: string[] = [
      'Name',
      'Direccion__c',
      'Fotos__c',
      'Descripcion__c',
      'Estado_Inmueble__c',
      'Ano_costruccion__c',
      'Ano_reforma__c',
    ]
  ): Promise<IStringToAnyDictionary[]> {
    const results = await this.conn.query(
      `SELECT ${fields.join(', ')} FROM ${objectName}`
    );

    return results.records;
  }
}

export const salesforceClient = new Salesforce();
