import fs from 'fs';
import stream from 'stream';
import sharp from 'sharp';

const MAX_WIDTH = 1800;
const QUALITY = 60;
const JPEG_PROGRESSIVE = true;

const optimizeImage = async (data: Buffer): Promise<Buffer> => {
  try {
    let image = sharp(data);
    const info = await image.metadata();

    image = image.jpeg({ quality: QUALITY, progressive: JPEG_PROGRESSIVE });
    if (info.width < MAX_WIDTH) {
      return image.toBuffer();
    }

    return image.resize({ width: MAX_WIDTH }).toBuffer();
  } catch (error) {
    return data;
  }
};

const storeFile = async (data: Buffer, path: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(path);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(data);

    bufferStream.pipe(fileStream);
    fileStream.on('finish', () => {
      resolve();
    });
    fileStream.on('error', (err) => {
      reject(err);
    });
  });

export const processImage = async (
  image: Buffer,
  path: string
): Promise<void> => {
  const optimizedImage = await optimizeImage(image);
  await storeFile(optimizedImage, path);
};
