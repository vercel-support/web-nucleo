import { useState, Dispatch, SetStateAction } from 'react';

import { IFlat } from '../model/flat.model';

const useSearchState = (): [IFlat[], Dispatch<SetStateAction<IFlat[]>>] => {
  return useState([] as IFlat[]);
};

export default useSearchState;
