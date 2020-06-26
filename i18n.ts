import NextI18Next from 'next-i18next';
import getConfig from 'next/config';

const { localeSubpaths } = getConfig().publicRuntimeConfig;

const localeSubpathVariations = {
  none: {},
  foreign: {
    en: 'en',
  },
  all: {
    es: 'es',
    en: 'en',
  },
};

export default new NextI18Next({
  defaultLanguage: 'es',
  otherLanguages: ['en'],
  localeSubpaths: localeSubpathVariations[localeSubpaths],
});
