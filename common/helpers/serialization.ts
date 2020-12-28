export const deserializeSingle = <T>(json: string): T => {
  return JSON.parse(json) as T;
};

export const deserializeMultiple = <T>(json: string): T[] => {
  return JSON.parse(json) as T[];
};
