import { useState, Dispatch, SetStateAction } from 'react';

const cookiesAcceptedKey = 'cookiesAccepted';

const useCookiesAcceptedState = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const [cookiesAccepted, setCookiesAcceptedInternal] = useState(() => {
    return typeof window === 'undefined'
      ? true
      : localStorage.getItem(cookiesAcceptedKey) === 'true';
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
      cookiesAcceptedKey,
      JSON.stringify(cookiesAcceptedValue)
    );
  };

  return [cookiesAccepted, setCookiesAccepted];
};

export default useCookiesAcceptedState;
