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
