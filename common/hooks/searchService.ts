import { createContext, useContext, Dispatch, SetStateAction } from 'react';

import { IFlat } from '../model/flat.model';
import { ISearchOption } from '../model/searchOption.model';
import { SearchOptionType } from '../model/enums/searchOptionType.enum';

interface ISearchService {
  init(flats: IFlat[], setResults: Dispatch<SetStateAction<IFlat[]>>): void;
  updateResults(openSearch: boolean, query: string): void;
  getSearchOptions(query: string): ISearchOption[];
}

class SearchService implements ISearchService {
  private flats: IFlat[] = [];
  private searchOptions: ISearchOption[] = [];
  private setResults: Dispatch<SetStateAction<IFlat[]>>;

  init(flats: IFlat[], setResults: Dispatch<SetStateAction<IFlat[]>>) {
    this.flats = flats;
    this.searchOptions = this.computeSearchOptions();
    this.setResults = setResults;

    this.setResults([]);
  }

  updateResults(openSearch: boolean, query: string): void {
    const auxQuery = query.trim().toLowerCase();

    if (this.setResults) {
      let results: IFlat[] = [];
      if (auxQuery) {
        results = this.flats.filter((flat) => {
          if (openSearch) {
            return (
              flat.city.toLowerCase().includes(auxQuery) ||
              flat.zone.toLowerCase().includes(auxQuery) ||
              flat.address.toLowerCase().includes(auxQuery)
            );
          } else {
            const city = this.extractCityFromQuery(auxQuery);
            const zone = this.extractZoneFromQuery(auxQuery);
            return (
              flat.city.toLowerCase() === city &&
              (!zone || flat.zone.toLowerCase() === zone)
            );
          }
        });
      }
      this.setResults(results);
    }
  }

  getSearchOptions(query: string): ISearchOption[] {
    const auxQuery = query.trim().toLowerCase();
    const city = this.extractCityFromQuery(auxQuery);
    const zone = this.extractZoneFromQuery(auxQuery);

    return this.searchOptions.filter(
      (searchOption) =>
        searchOption.text.toLowerCase().includes(city) &&
        (!zone || searchOption.text.toLowerCase().includes(zone))
    );
  }

  private computeSearchOptions(): ISearchOption[] {
    const citiesOptionsRepeated = this.flats.map((flat) => ({
      text: flat.city,
      count: 1,
      type: SearchOptionType.CITY,
    }));
    const citiesOptions: ISearchOption[] = [];
    for (const cityOption of citiesOptionsRepeated) {
      const index = citiesOptions.findIndex(
        (co) => co.text === cityOption.text
      );
      if (index >= 0) {
        citiesOptions[index].count = citiesOptions[index].count + 1;
      } else {
        citiesOptions.push(cityOption);
      }
    }

    const zonesOptionsRepeated = this.flats.map((flat) => ({
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
  }

  private extractCityFromQuery(query: string) {
    let city = query;
    if (query.charAt(query.length - 1) === ')') {
      const parenthesisIndex = query.lastIndexOf('(');
      if (parenthesisIndex >= 0) {
        city = query.substring(parenthesisIndex + 1, query.length - 1);
      }
    }
    return city;
  }

  private extractZoneFromQuery(query: string) {
    let zone = '';
    if (query.charAt(query.length - 1) === ')') {
      const parenthesisIndex = query.lastIndexOf('(');
      if (parenthesisIndex >= 0) {
        zone = query.substring(0, parenthesisIndex - 1);
      }
    }
    return zone;
  }
}

const searchService = new SearchService();

const SearchServiceContext = createContext<ISearchService>(searchService);

const useSearchService = (): ISearchService => {
  return useContext(SearchServiceContext);
};

export default useSearchService;
