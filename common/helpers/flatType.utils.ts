export const getFlatTypeLabel = (flatType: string): string => {
  return `enums.flatType.${canonizeFlatType(flatType)}`;
};

export const canonizeFlatType = (flatType: string): string => {
  return flatType.replace(' ', '_').toUpperCase();
};
