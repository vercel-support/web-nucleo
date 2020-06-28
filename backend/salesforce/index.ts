import { Connection } from 'jsforce';
import { memoize } from '../../common/helpers';
import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';

import axios from 'axios';

export class Salesforce {
  private conn = new Connection();

  async init(
    user: string = process.env.SALESFORCE_USER,
    password: string = process.env.SALESFORCE_PASSWORD
  ): Promise<void> {
    await this.conn.login(user, password);
  }

  @memoize
  async fetchBase64ImageSource(
    url: string,
    objectName: string,
    fieldName: string
  ): Promise<string> {
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
    const results = await this.conn.query(
      `SELECT ${fields.join(', ')} FROM ${objectName}`
    );

    return results.records;
  }
}

export const salesforceClient = new Salesforce();
