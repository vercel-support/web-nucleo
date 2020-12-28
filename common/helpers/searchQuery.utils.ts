import { I18nContextType } from '../../libs/i18n';
import { SearchType } from '../model/enums/searchType.enum';

export const isMapAreaQuery = (q: string): boolean => {
  return !!q.match(/\d_/);
};

export const canonizeSearchQuery = (q: string): string => {
  return q.replace(/_/g, ' ').substring(isMapAreaQuery(q) ? 2 : 0);
};

export const extractCityFromQuery = (q: string): string => {
  let city = q;
  if (q.charAt(q.length - 1) === ')') {
    const parenthesisIndex = q.lastIndexOf('(');
    if (parenthesisIndex >= 0) {
      city = q.substring(parenthesisIndex + 1, q.length - 1);
    }
  }
  return city;
};

export const extractZoneFromQuery = (q: string): string => {
  let zone = '';
  if (q.charAt(q.length - 1) === ')') {
    const parenthesisIndex = q.lastIndexOf('(');
    if (parenthesisIndex >= 0) {
      zone = q.substring(0, parenthesisIndex - 1);
    }
  }
  return zone;
};

export const getTitleFromQuery = (
  q: string,
  searchType: number,
  i18n: I18nContextType
): string => {
  return i18n.t(
    `search.title.${
      searchType === SearchType.CLOSED || searchType === SearchType.MAP_AREA
        ? 'closed'
        : 'open'
    }`,
    { query: canonizeSearchQuery(q) }
  );
};
