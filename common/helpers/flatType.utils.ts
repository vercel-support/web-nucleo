export const getFlatTypeLabel = (flatType: string): string => {
  return `enums.flatType.${flatType.replace(' ', '_').toUpperCase()}`;
};
