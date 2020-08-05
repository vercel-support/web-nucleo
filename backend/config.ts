import { Storage } from '@google-cloud/storage';

const SA_STORAGE_OBJECT_CREATOR_CREDENTIALS = JSON.parse(
  Buffer.from(process.env.SA_STORAGE_OBJECT_CREATOR_BASE64, 'base64').toString()
);

export const gStorage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: SA_STORAGE_OBJECT_CREATOR_CREDENTIALS,
});

export const GS_STATIC_DATA_BUCKET_NAME = 'static-data-storage';
export const GS_STORAGE_BASE_URL = 'https://storage.googleapis.com';
