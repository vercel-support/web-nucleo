import { FunctionComponent, useEffect } from 'react';
import { createContext, useState, useRef } from 'react';
import rosetta from 'rosetta';
// import rosetta from 'rosetta/debug';

import ES from '../common/locales/es.json';
import EN from '../common/locales/en.json';

const i18n = rosetta();

export const defaultLanguage = 'es';
export const defaultDict = ES;
export const languages = ['es', 'en'];
export const dicts = { es: ES, en: EN };
export const contentLanguageMap = { es: 'es-ES', en: 'en-GB' };

export type I18nContextType = {
  activeLocale: string;
  t: (
    key: string | (string | number)[],
    params?: any[] | Record<string, any>,
    lang?: string
  ) => string;
  locale: (l: string) => void;
};

export const I18nContext = createContext<I18nContextType>(null);

const rosettaLocaleKey = 'rosettaLocale';

const getActiveLocaleFromLocalStorage = (): string => {
  return typeof window === 'undefined'
    ? defaultLanguage
    : localStorage.getItem(rosettaLocaleKey) || defaultLanguage;
};

const I18n: FunctionComponent = ({ children }) => {
  const activeLocale = getActiveLocaleFromLocalStorage();
  const activeDict = dicts[activeLocale] || defaultDict;
  const [, setTick] = useState(0);
  const firstRender = useRef(true);

  // for initial SSR render
  if (firstRender.current === true) {
    firstRender.current = false;
    i18n.locale(activeLocale);
    i18n.set(activeLocale, activeDict);
  }

  useEffect(() => {
    const activeLocaleFromLocalStorage = getActiveLocaleFromLocalStorage();
    if (activeLocale !== activeLocaleFromLocalStorage) {
      const dict = dicts[activeLocaleFromLocalStorage];
      if (dict) {
        i18n.locale(activeLocaleFromLocalStorage);
        i18n.set(activeLocaleFromLocalStorage, dict);
        // force rerender
        setTick((tick) => tick + 1);
      }
    }
  });

  const i18nWrapper = {
    activeLocale,
    t: (
      key: string | (string | number)[],
      params?: any[] | Record<string, any>,
      lang?: string
    ) => i18n.t(key, params, lang),
    locale: (l: string) => {
      const dict = dicts[l];
      if (dict) {
        localStorage.setItem(rosettaLocaleKey, l);
        i18n.locale(l);
        i18n.set(l, dict);
        // force rerender
        setTick((tick) => tick + 1);
      }
    },
  };

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  );
};

export default I18n;
