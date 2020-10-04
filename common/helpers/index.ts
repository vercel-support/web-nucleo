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
