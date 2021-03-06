import { createContext, useContext, Dispatch, SetStateAction } from 'react';

import { IFlat } from '../model/flat.model';
import { ISearchOption } from '../model/searchOption.model';
import { IFilter } from '../model/filter.model';
import { SearchOptionType } from '../model/enums/searchOptionType.enum';
import { SearchType } from '../model/enums/searchType.enum';
import { FlatOrderBy } from '../model/enums/flatOrderBy.enum';
import { canonizeFlatType } from '../helpers/flatType.utils';
import * as searchQueryUtils from '../helpers/searchQuery.utils';

export const computeResults = (
  flats: IFlat[],
  searchType: number,
  q: string,
  filter?: IFilter
): IFlat[] => {
  let results: IFlat[] = [];

  const auxQ = q.trim().toLowerCase();
  if (auxQ) {
    results = flats.filter((flat) => {
      if (searchType === SearchType.CLOSED) {
        const city = searchQueryUtils.extractCityFromQuery(auxQ);
        const zone = searchQueryUtils.extractZoneFromQuery(auxQ);
        return (
          flat.city.toLowerCase() === city &&
          (!zone || flat.zone.toLowerCase() === zone)
        );
      } else if (searchType === SearchType.OPEN) {
        return (
          flat.city.toLowerCase().includes(auxQ) ||
          flat.zone.toLowerCase().includes(auxQ) ||
          flat.address.toLowerCase().includes(auxQ)
        );
      } else if (searchType === SearchType.MAP_AREA) {
        return flat.mapAreaIds.includes(q);
      }
    });
  }

  if (filter) {
    if (Array.isArray(filter.types)) {
      results = results.filter((result) =>
        filter.types.some((type) => canonizeFlatType(result.type) === type)
      );
    }
    if (typeof filter.priceMin === 'number') {
      results = results.filter((result) => result.price >= filter.priceMin);
    }
    if (typeof filter.priceMax === 'number') {
      results = results.filter((result) => result.price <= filter.priceMax);
    }
    if (typeof filter.sqrtMetersMin === 'number') {
      results = results.filter(
        (result) => result.sqrMeters >= filter.sqrtMetersMin
      );
    }
    if (typeof filter.sqrtMetersMax === 'number') {
      results = results.filter(
        (result) => result.sqrMeters <= filter.sqrtMetersMax
      );
    }
    if (Array.isArray(filter.rooms)) {
      results = results.filter((result) => {
        if (
          typeof filter.roomsMin === 'number' &&
          result.rooms >= filter.roomsMin
        ) {
          return true;
        }
        return filter.rooms.some((r) => result.rooms === r);
      });
    } else {
      if (typeof filter.roomsMin === 'number') {
        results = results.filter((result) => result.rooms >= filter.roomsMin);
      }
    }
    if (Array.isArray(filter.bathrooms)) {
      results = results.filter((result) => {
        if (
          typeof filter.bathroomsMin === 'number' &&
          result.bathrooms >= filter.bathroomsMin
        ) {
          return true;
        }
        return filter.bathrooms.some((r) => result.bathrooms === r);
      });
    } else {
      if (typeof filter.bathroomsMin === 'number') {
        results = results.filter(
          (result) => result.bathrooms >= filter.bathroomsMin
        );
      }
    }
    if (Array.isArray(filter.characteristics)) {
      results = results.filter((result) =>
        filter.characteristics.every(
          (characteristic) => !!result[characteristic]
        )
      );
    }
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

interface ISearchService {
  init(
    flats: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults?: Dispatch<SetStateAction<IFlat[]>>
  ): void;
  setResults(results: IFlat[]): void;
  setSearchType(searchType: number): void;
  getSearchOptions(q: string): ISearchOption[];
  computeResults(query: NodeJS.Dict<string | string[]>): void;
  getResultsCount(): number;
  getSearchType(): number;
  getPageSize(): number;
  incrementPageSize(): void;
  getOrderBy(): string;
  setOrderBy(orderBy: string): void;
  generateQueryFromFilter(filter: IFilter): NodeJS.Dict<string | string[]>;
}

class SearchService implements ISearchService {
  private flats: IFlat[] = [];
  private results: IFlat[] = [];
  private searchType = SearchType.CLOSED;
  private searchOptions: ISearchOption[] = [];
  private setCurrentResults: Dispatch<SetStateAction<IFlat[]>>;

  private pageSize: number;
  private orderBy: string;

  private readonly INITIAL_PAGE_SIZE = 60;
  private readonly PAGE_SIZE_INCREMENT_SIZE = 30;
  private readonly INITIAL_ORDER_BY = FlatOrderBy.PRICE_DESC;

  init(
    flats: IFlat[],
    searchOptions: ISearchOption[],
    setCurrentResults: Dispatch<SetStateAction<IFlat[]>>
  ) {
    this.flats = flats;
    this.searchOptions = searchOptions;
    this.setCurrentResults = setCurrentResults;

    this.computePageSizeDependingOnResultsCount(this.INITIAL_PAGE_SIZE);
    this.orderBy = this.INITIAL_ORDER_BY;
    this.updateResults();
  }

  setResults(results: IFlat[]): void {
    this.results = results;
    this.computePageSizeDependingOnResultsCount(this.INITIAL_PAGE_SIZE);
    this.updateResults();
  }

  setSearchType(searchType: number): void {
    this.searchType = searchType;
  }

  getSearchOptions(q: string): ISearchOption[] {
    const auxQ = q.trim().toLowerCase();
    const city = searchQueryUtils.extractCityFromQuery(auxQ);
    const zone = searchQueryUtils.extractZoneFromQuery(auxQ);

    return this.searchOptions.filter(
      (searchOption) =>
        searchOption.text.toLowerCase().includes(city) &&
        (!zone || searchOption.text.toLowerCase().includes(zone))
    );
  }

  computeResults(query: NodeJS.Dict<string | string[]>): void {
    const q = query.q as string;
    this.computeSearchType(q);
    const results = computeResults(
      this.flats,
      this.searchType,
      q,
      this.computeFilter(query)
    );
    this.setResults(results);
  }

  getResultsCount(): number {
    return this.results.length;
  }

  getSearchType(): number {
    return this.searchType;
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

  getOrderBy(): string {
    return this.orderBy;
  }

  setOrderBy(orderBy: string): void {
    this.orderBy = orderBy;
    this.updateResults();
  }

  generateQueryFromFilter(filter: IFilter): NodeJS.Dict<string | string[]> {
    const query: NodeJS.Dict<string | string[]> = {};
    if (Array.isArray(filter.types) && filter.types.length) {
      query.types = filter.types;
    }
    if (typeof filter.priceMin === 'number') {
      query.priceMin = filter.priceMin + '';
    }
    if (typeof filter.priceMax === 'number') {
      query.priceMax = filter.priceMax + '';
    }
    if (Array.isArray(filter.rooms) && filter.rooms.length) {
      query.rooms = filter.rooms.map((r) => r + '');
    }
    if (typeof filter.roomsMin === 'number') {
      query.roomsMin = filter.roomsMin + '';
    }
    if (Array.isArray(filter.bathrooms) && filter.bathrooms.length) {
      query.bathrooms = filter.bathrooms.map((r) => r + '');
    }
    if (typeof filter.bathroomsMin === 'number') {
      query.bathroomsMin = filter.bathroomsMin + '';
    }
    return query;
  }

  private updateResults(): void {
    if (this.setCurrentResults) {
      const sortedResults = [...this.results].sort((a, b) =>
        this.orderBy === FlatOrderBy.PRICE_ASC
          ? a.price - b.price
          : b.price - a.price
      );
      this.setCurrentResults(sortedResults.slice(0, this.pageSize));
    }
  }

  private computeSearchType(q: string) {
    if (searchQueryUtils.isMapAreaQuery(q)) {
      this.searchType = SearchType.MAP_AREA;
    } else if (
      this.searchOptions.some((searchOption) => searchOption.text === q)
    ) {
      this.searchType = SearchType.CLOSED;
    } else {
      this.searchType = SearchType.OPEN;
    }
  }

  private computeFilter(query: NodeJS.Dict<string | string[]>): IFilter {
    const filter: IFilter = {};
    if (query.types) {
      filter.types = Array.isArray(query.types) ? query.types : [query.types];
    }
    if (query.priceMin) {
      filter.priceMin = +(query.priceMin as string);
    }
    if (query.priceMax) {
      filter.priceMax = +(query.priceMax as string);
    }
    if (query.sqrtMetersMin) {
      filter.sqrtMetersMin = +(query.sqrtMetersMin as string);
    }
    if (query.sqrtMetersMax) {
      filter.sqrtMetersMax = +(query.sqrtMetersMax as string);
    }
    if (query.rooms) {
      filter.rooms = Array.isArray(query.rooms)
        ? query.rooms.map((r) => +r)
        : [+query.rooms];
    }
    if (query.roomsMin) {
      filter.roomsMin = +(query.roomsMin as string);
    }
    if (query.bathrooms) {
      filter.bathrooms = Array.isArray(query.bathrooms)
        ? query.bathrooms.map((r) => +r)
        : [+query.bathrooms];
    }
    if (query.bathroomsMin) {
      filter.bathroomsMin = +(query.bathroomsMin as string);
    }
    if (query.characteristics) {
      filter.characteristics = Array.isArray(query.characteristics)
        ? query.characteristics
        : [query.characteristics];
    }
    return filter;
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
