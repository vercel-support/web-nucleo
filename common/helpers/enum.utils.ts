export const enumToArray = (
  enumeration: Record<string, string | number>,
  typeofValue: string,
  keyName: string,
  valueName: string
): Record<string, string | number>[] => {
  return Object.keys(enumeration)
    .filter((key) => typeof enumeration[key] === typeofValue)
    .map((key) => {
      const result: Record<string, string | number> = {};
      result[keyName] = key;
      result[valueName] = enumeration[key];
      return result;
    });
};
