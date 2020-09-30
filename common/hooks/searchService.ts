import { createContext, useContext, Dispatch, SetStateAction } from 'react';

import { IFlat } from '../model/flat.model';
import { ISearchOption } from '../model/searchOption.model';
import { SearchOptionType } from '../model/enums/searchOptionType.enum';

export const computeResults = (
  flats: IFlat[],
  openSearch: boolean,
  query: string
): IFlat[] => {
  let results: IFlat[] = [];

  const auxQuery = query.trim().toLowerCase();
  if (auxQuery) {
    results = flats.filter((flat) => {
      if (openSearch) {
        return (
          flat.city.toLowerCase().includes(auxQuery) ||
          flat.zone.toLowerCase().includes(auxQuery) ||
          flat.address.toLowerCase().includes(auxQuery)
        );
      } else {
        const city = extractCityFromQuery(auxQuery);
        const zone = extractZoneFromQuery(auxQuery);
        return (
          flat.city.toLowerCase() === city &&
          (!zone || flat.zone.toLowerCase() === zone)
        );
      }
    });
  }
  return results;
};

export const computeSearchOptions = (flats: IFlat[]): ISearchOption[] => {
  const citiesOptionsRepeated = flats.map((flat) => ({
    text: flat.city,
    count: 1,
    type: SearchOptionType.CITY,
  }));
  const citiesOptions: ISearchOption[] = [];
  for (const cityOption of citiesOptionsRepeated) {
    const index = citiesOptions.findIndex((co) => co.text === cityOption.text);
    if (index >= 0) {
      citiesOptions[index].count = citiesOptions[index].count + 1;
    } else {
      citiesOptions.push(cityOption);
    }
  }

  const zonesOptionsRepeated = flats.map((flat) => ({
    text: `${flat.zone} (${flat.city})`,
    count: 1,
    type: SearchOptionType.ZONE,
  }));
  const zonesOptions: ISearchOption[] = [];
  for (const zoneOption of zonesOptionsRepeated) {
    const index = zonesOptions.findIndex((zo) => zo.text === zoneOption.text);
    if (index >= 0) {
      zonesOptions[index].count = zonesOptions[index].count + 1;
    } else {
      zonesOptions.push(zoneOption);
    }
  }

  return [...citiesOptions, ...zonesOptions];
};

const extractCityFromQuery = (query: string): string => {
  let city = query;
  if (query.charAt(query.length - 1) === ')') {
    const parenthesisIndex = query.lastIndexOf('(');
    if (parenthesisIndex >= 0) {
      city = query.substring(parenthesisIndex + 1, query.length - 1);
    }
  }
  return city;
};

const extractZoneFromQuery = (query: string): string => {
  let zone = '';
  if (query.charAt(query.length - 1) === ')') {
    const parenthesisIndex = query.lastIndexOf('(');
    if (parenthesisIndex >= 0) {
      zone = query.substring(0, parenthesisIndex - 1);
    }
  }
  return zone;
};

interface ISearchService {
  init(
    results: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults: Dispatch<SetStateAction<IFlat[]>>
  ): void;
  getSearchOptions(query: string): ISearchOption[];
  filter(minPrice: number, maxPrice: number): void;
}

class SearchService implements ISearchService {
  private results: IFlat[] = [];
  private searchOptions: ISearchOption[] = [];
  private setCurrentResults: Dispatch<SetStateAction<IFlat[]>>;

  init(
    results: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults: Dispatch<SetStateAction<IFlat[]>>
  ) {
    this.results = results;
    this.searchOptions = searchOptions;
    this.setCurrentResults = setCurrentResults;

    this.setCurrentResults(this.results);
  }

  getSearchOptions(query: string): ISearchOption[] {
    const auxQuery = query.trim().toLowerCase();
    const city = extractCityFromQuery(auxQuery);
    const zone = extractZoneFromQuery(auxQuery);

    return this.searchOptions.filter(
      (searchOption) =>
        searchOption.text.toLowerCase().includes(city) &&
        (!zone || searchOption.text.toLowerCase().includes(zone))
    );
  }

  filter(minPrice: number, maxPrice: number): void {
    this.setCurrentResults(
      this.results.filter(
        (result) => result.price >= minPrice && result.price <= maxPrice
      )
    );
  }
}

const searchService = new SearchService();

const SearchServiceContext = createContext<ISearchService>(searchService);

const useSearchService = (): ISearchService => {
  return useContext(SearchServiceContext);
};

export default useSearchService;
