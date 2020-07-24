import { Connection } from 'jsforce';
import { memoize, binaryToBase64ImageSrc } from '../../common/helpers';
import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';

import axios, { AxiosRequestConfig, Method, ResponseType } from 'axios';

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

  async fetchApi(
    relativeUrl: string,
    method: Method = 'GET',
    responseType: ResponseType = 'arraybuffer'
  ) {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: `${this.conn._baseUrl()}${relativeUrl}`,
      headers: {
        Authorization: `Bearer ${this.conn.accessToken}`,
      },
      responseType,
    };
    return await axios(requestConfig);
  }

  @memoize
  async fetchAttachedImages(entityId: string): Promise<string[]> {
    const queryRes = await this.conn.query(
      `Select id,ContentDocumentId,ContentDocument.LatestPublishedVersionId from ContentDocumentLink where LinkedEntityId = '${entityId}'`
    );
    const records = queryRes.records;

    return Promise.all(
      records.map(async (record) => {
        const versionId = record['ContentDocument']['LatestPublishedVersionId'];
        const res = await this.fetchApi(
          `/sobjects/ContentVersion/${versionId}/VersionData`
        );
        return binaryToBase64ImageSrc(res.data);
      })
    );
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

    const res = await this.fetchApi(
      `/sobjects/${objectName}/${objectId}/richTextImageFields/${fieldName}/${fieldId}`
    );

    return binaryToBase64ImageSrc(res.data);
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
