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
    flats: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults?: Dispatch<SetStateAction<IFlat[]>>
  ): void;
  getSearchOptions(query: string): ISearchOption[];
  computeResults(query: string): void;
  getResultsCount(): number;
  isOpenSearch(): boolean;
  getPageSize(): number;
  incrementPageSize(): void;
}

class SearchService implements ISearchService {
  private flats: IFlat[] = [];
  private results: IFlat[] = [];
  private openSearch = false;
  private searchOptions: ISearchOption[] = [];
  private setCurrentResults: Dispatch<SetStateAction<IFlat[]>>;

  private pageSize: number;

  private readonly INITIAL_PAGE_SIZE = 10;
  private readonly PAGE_SIZE_INCREMENT_SIZE = 5;

  init(
    flats: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults: Dispatch<SetStateAction<IFlat[]>>
  ) {
    this.flats = flats;
    this.searchOptions = searchOptions;
    this.setCurrentResults = setCurrentResults;

    this.computePageSizeDependingOnResultsCount(this.INITIAL_PAGE_SIZE);
    this.updateResults();
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

  computeResults(query: string): void {
    this.computeOpenSearch(query);
    const results = computeResults(this.flats, this.openSearch, query);
    this.results = results;
    this.computePageSizeDependingOnResultsCount(this.INITIAL_PAGE_SIZE);
    this.updateResults();
  }

  getResultsCount(): number {
    return this.results.length;
  }

  isOpenSearch(): boolean {
    return this.openSearch;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  incrementPageSize(): void {
    this.computePageSizeDependingOnResultsCount(
      this.pageSize + this.PAGE_SIZE_INCREMENT_SIZE
    );
    this.updateResults();
  }

  private updateResults(): void {
    if (this.setCurrentResults) {
      this.setCurrentResults(this.results.slice(0, this.pageSize));
    }
  }

  private computeOpenSearch(query: string) {
    this.openSearch = this.searchOptions.every(
      (searchOption) => searchOption.text !== query
    );
  }

  private computePageSizeDependingOnResultsCount(
    desiredPageSize: number
  ): void {
    this.pageSize = Math.min(desiredPageSize, this.results.length);
  }
}

const searchService = new SearchService();

const SearchServiceContext = createContext<ISearchService>(searchService);

const useSearchService = (): ISearchService => {
  return useContext(SearchServiceContext);
};

export default useSearchService;
