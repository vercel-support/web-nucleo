export const deserializeSingle = <T>(json: string, cls: new () => T): T => {
  const parsedJson = JSON.parse(json);
  const obj = Object.create(cls.prototype);
  return Object.assign(obj, parsedJson);
};

export const deserializeMultiple = <T>(json: string, cls: new () => T): T[] => {
  const parsedJson = JSON.parse(json);
  return parsedJson.map((dct) => {
    const obj = Object.create(cls.prototype);
    return Object.assign(obj, dct);
  });
};
