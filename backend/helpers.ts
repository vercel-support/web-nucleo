const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const tempFolder = `${process.cwd()}/.next/temp`;
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}
const cachePath = `${tempFolder}/memo_cache.json`;

export const asyncMemoize = (
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  let cache = {};
  if (fs.existsSync(cachePath)) {
    cache = JSON.parse(fs.readFileSync(cachePath));
  }

  if (!(propertyKey in cache)) {
    cache[propertyKey] = {};
  }
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args) {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in cache[propertyKey]) {
      return cache[propertyKey][serializedArgs];
    }

    const res = await originalMethod.apply(this, args);

    cache[propertyKey][serializedArgs] = res;
    const stringCache = JSON.stringify(cache);
    await writeFile(cachePath, stringCache);
    return res;
  };
  return descriptor;
};
