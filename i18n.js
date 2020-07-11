const path = require('path');
const NextI18Next = require('next-i18next').default;

let subpaths = {
  es: 'es',
  en: 'en',
};
if (process.browser == true) {
  subpaths = {};
}

module.exports = new NextI18Next({
  otherLanguages: ['es'],
  subpaths,
  localePath: path.resolve('./public/static/locales'),
});
