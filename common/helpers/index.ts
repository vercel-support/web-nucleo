export const memoize = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const cache = {};
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const serialized_args = JSON.stringify(args);
    if (serialized_args in cache) {
      return cache[serialized_args];
    }

    const res = originalMethod.apply(this, args);

    cache[serialized_args] = res;
    return res;
  };
  return descriptor;
};
