import { Connection } from 'jsforce';
import { memoize } from '../../common/helpers';
import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';

import axios from 'axios';

export class Salesforce {
  private conn = new Connection();
  private initialized = false;
  async init(
    user: string = process.env.SALESFORCE_USER,
    password: string = process.env.SALESFORCE_PASSWORD
  ): Promise<Salesforce> {
    await this.conn.login(user, password);
    this.initialized = true;
    return this;
  }

  @memoize
  async fetchBase64ImageSource(
    url: string,
    objectName: string,
    fieldName: string
  ): Promise<string> {
    if (this.initialized == false) {
      throw Error('Initialize the salesforce client before using it.');
    }

    const searchParams = new URL(url).searchParams;
    const objectId = searchParams.get('eid');
    const fieldId = searchParams.get('refid');

    const res = await axios({
      method: 'GET',
      url: `${this.conn._baseUrl()}/sobjects/${objectName}/${objectId}/richTextImageFields/${fieldName}/${fieldId}`,
      headers: {
        Authorization: `Bearer ${this.conn.accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    const base64 = new Buffer(res.data, 'binary').toString('base64');
    return `data:image/*;base64,${base64}`;
  }

  @memoize
  async fetchAllObjectInstances(
    objectName: string,
    fields: string[]
  ): Promise<IStringToAnyDictionary[]> {
    if (this.initialized == false) {
      throw Error('Initialize the salesforce client before using it.');
    }

    const results = await this.conn.query(
      `SELECT ${fields.join(', ')} FROM ${objectName}`
    );

    return results.records;
  }
}

let salesforceClient: Salesforce;
export const getSalesforceClient = async (): Promise<Salesforce> => {
  if (salesforceClient != undefined) {
    return salesforceClient;
  }

  const sf = new Salesforce();
  salesforceClient = await sf.init();
  return salesforceClient;
};
