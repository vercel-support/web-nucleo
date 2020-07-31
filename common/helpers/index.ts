const GLOBAL_CACHE = {};
export const memoize = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  if (!(propertyKey in GLOBAL_CACHE)) {
    GLOBAL_CACHE[propertyKey] = {};
  }
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in GLOBAL_CACHE[propertyKey]) {
      return GLOBAL_CACHE[propertyKey][serializedArgs];
    }

    const res = originalMethod.apply(this, args);

    GLOBAL_CACHE[propertyKey][serializedArgs] = res;
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

export const formatCurrency = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  })
    .format(value)
    .replace(/\D00(?=\D*$)/, '');
};

export const binaryToBase64ImageSrc = (data: any): string => {
  const base64 = new Buffer(data, 'binary').toString('base64');
  return `data:image/*;base64,${base64}`;
};
