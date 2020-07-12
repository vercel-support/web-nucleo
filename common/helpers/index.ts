export const memoize = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const cache = {};
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in cache) {
      return cache[serializedArgs];
    }

    const res = originalMethod.apply(this, args);

    cache[serializedArgs] = res;
    return res;
  };
  return descriptor;
};

export const split = <T>(array: T[], max_chunk_size: number): T[][] => {
  const [...arr] = array;
  const res = [];
  while (arr.length) {
    res.push(arr.splice(0, max_chunk_size));
  }
  return res;
};

export const formatCurrency = (n: number): string => {
  let res = n
    .toFixed(2)
    .replace('.', ',')
    .replace(/\d{3}(?=(\d{3})*,)/g, function (s) {
      return '.' + s;
    });
  if (res[0] === '.') {
    res = res.substr(1);
  }
  return res;
};
