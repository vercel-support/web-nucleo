import { useState, Dispatch, SetStateAction } from 'react';

export const useCookiesState = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const [cookiesAccepted, setCookiesAcceptedInternal] = useState(() => {
    return typeof window === 'undefined'
      ? true
      : localStorage.getItem('cookiesAccepted') === 'true';
  });

  const setCookiesAccepted: Dispatch<SetStateAction<boolean>> = (
    newCookiesAccepted
  ) => {
    const cookiesAcceptedValue =
      newCookiesAccepted instanceof Function
        ? newCookiesAccepted(cookiesAccepted)
        : newCookiesAccepted;

    setCookiesAcceptedInternal(cookiesAcceptedValue);
    localStorage.setItem(
      'cookiesAccepted',
      JSON.stringify(cookiesAcceptedValue)
    );
  };

  return [cookiesAccepted, setCookiesAccepted];
};
