import { Connection } from 'jsforce';
import { memoize } from '../../common/helpers';
import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';

import Flat from './flat';

export class Salesforce {
  private conn = new Connection();

  async init(
    user: string = process.env.SALESFORCE_USER,
    password: string = process.env.SALESFORCE_PASSWORD
  ): Promise<void> {
    await this.conn.login(user, password);
  }

  async getFlats() {
    const records = await this.fetchAllObjectInstances(
      Flat.objectName,
      Flat.fields
    );
    const flats = records.map((record) => new Flat(record));
    return flats;
  }

  @memoize
  async fetchAllObjectInstances(
    objectName: string,
    fields: string[]
  ): Promise<IStringToAnyDictionary[]> {
    const results = await this.conn.query(
      `SELECT ${fields.join(', ')} FROM ${objectName}`
    );

    return results.records;
  }
}

export const salesforceClient = new Salesforce();
