import { Connection } from 'jsforce';
import { retry } from 'async-retry-decorator';
import { memoize, binaryToBase64ImageSrc } from '../../common/helpers';
import { processImage } from '../images';
import { IStringToAnyDictionary } from '../../common/model/stringToAnyDictionary.model';
import { join } from 'path';
import fs from 'fs';
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

  @retry({
    retries: 3,
    onRetry: (error, attempt) => {
      console.log(`Retry querySOQL (${attempt}) on error`, error.message);
    },
  })
  async querySOQL(query: string): Promise<any> {
    return this.conn.query(query);
  }

  @retry({
    retries: 3,
    onRetry: (error, attempt) => {
      console.log(`Retry fetchApi (${attempt}) on error`, error.message);
    },
  })
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
    const basePath = `${process.cwd()}/public`;
    const innerPath = '/gen/';
    const folder = join(basePath, innerPath);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const filesInFolder: string[] = await new Promise((resolve, reject) => {
      fs.readdir(folder, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    const queryRes = await this.querySOQL(
      `Select id,ContentDocumentId,ContentDocument.LatestPublishedVersionId, ContentDocument.FileExtension, ContentDocument.FileType, ContentDocument.Title from ContentDocumentLink where LinkedEntityId = '${entityId}'`
    );
    const records = queryRes.records;
    if (records.length <= 0) {
      return [];
    }

    const imageIds = records.map((record) => {
      return {
        id: record['ContentDocument']['LatestPublishedVersionId'],
        extension: record['ContentDocument']['FileExtension'],
        title: record['ContentDocument']['Title']
      };
    }).sort((a, b) => {
      return a['title'].localeCompare(b['title'], undefined, {numeric: true});
    });

    const urls = imageIds.map((imageId) => {
      const filename = `salesforce-image-${imageId['id']}.${imageId['extension']}`;
      return join(innerPath, filename);
    });

    const missingImageIds = imageIds.filter((imageId) => {
      return !filesInFolder.includes(
        `salesforce-image-${imageId['id']}.${imageId['extension']}`
      );
    });

    const missingImages: Buffer[] = await Promise.all(
      missingImageIds.map(async (imageId) => {
        const res = await this.fetchApi(
          `/sobjects/ContentVersion/${imageId['id']}/VersionData`
        );
        return res.data;
      })
    );

    const missingPaths = imageIds.map((imageId) => {
      return join(
        folder,
        `salesforce-image-${imageId['id']}.${imageId['extension']}`
      );
    });

    const promises: Promise<void>[] = [];
    for (let i = 0; i < missingImages.length; i++) {
      promises.push(processImage(missingImages[i], missingPaths[i]));
    }

    await Promise.all(promises);

    return urls;
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

    const results = await this.querySOQL(
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
