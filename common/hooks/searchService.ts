import { createContext, useContext, Dispatch, SetStateAction } from 'react';

import { IFlat } from '../model/flat.model';

interface ISearchService {
  init(flats: IFlat[], setResults: Dispatch<SetStateAction<IFlat[]>>): void;
  setPageSize(pageSize: number): void;
}

class SearchService implements ISearchService {
  private readonly INITIAL_PAGE_SIZE = 10;

  private flats: IFlat[] = [];
  private setResults: Dispatch<SetStateAction<IFlat[]>>;

  init(flats: IFlat[], setResults: Dispatch<SetStateAction<IFlat[]>>) {
    this.flats = flats;
    this.setResults = setResults;

    this.setResults(this.flats.slice(0, this.INITIAL_PAGE_SIZE));
  }

  setPageSize(pageSize: number) {
    this.setResults(this.flats.slice(0, pageSize));
  }
}

const searchService = new SearchService();

const SearchServiceContext = createContext<ISearchService>(searchService);

const useSearchService = (): ISearchService => {
  return useContext(SearchServiceContext);
};

export default useSearchService;
