import { createHash } from 'crypto';
import {
  GS_STATIC_DATA_BUCKET_NAME,
  GS_STORAGE_BASE_URL,
  gStorage,
} from './config';
import { File } from '@google-cloud/storage';
import { join } from 'path';
import { PassThrough } from 'stream';

async function listFilesByPrefix(
  prefix: string,
  bucketName: string
): Promise<File[]> {
  const options = {
    prefix: prefix,
  };

  const [files] = await gStorage.bucket(bucketName).getFiles(options);
  return files;
}

async function uploadFile(
  data: any,
  filename: string,
  bucketName: string
): Promise<void> {
  const gcFile = gStorage.bucket(bucketName).file(filename);

  const dataStream = new PassThrough();
  dataStream.push(data);
  dataStream.push(null);

  return new Promise((resolve, reject) => {
    dataStream
      .pipe(
        gcFile.createWriteStream({
          resumable: false,
          validation: false,
          metadata: { 'Cache-Control': 'public, max-age=31536000' },
        })
      )
      .on('error', (error: Error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve();
      });
  });
}

export const uploadImagesToGS = async (
  prefix: string,
  images: any[]
): Promise<string[]> => {
  const existingFiles = await listFilesByPrefix(
    prefix,
    GS_STATIC_DATA_BUCKET_NAME
  );
  const existingFileNames = existingFiles.map((file) => file.name);

  const promises: Promise<void>[] = [];
  const filenames: string[] = [];
  for (const image in images) {
    const contentHash = createHash('md5').update(image).digest('hex');
    const filename = `${prefix}${contentHash}`;
    if (!existingFileNames.includes(filename)) {
      promises.push(uploadFile(image, filename, GS_STATIC_DATA_BUCKET_NAME));
      console.log(`Uploading file ${filename}.`);
    } else {
      console.log(`File ${filename} already found. Not uploading.`);
    }
    filenames.push(filename);
  }

  await Promise.all(promises);

  return filenames.map((filename) =>
    join(GS_STORAGE_BASE_URL, GS_STATIC_DATA_BUCKET_NAME, filename)
  );
};
