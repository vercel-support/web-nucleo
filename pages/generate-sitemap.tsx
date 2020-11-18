import { NextPage, GetStaticProps } from 'next';
import globby from 'globby';

import Flat from '../backend/salesforce/flat';
import { computeSearchOptions } from '../common/hooks/searchService';

const SITE_URL = 'https://www.inmobiliarianucleo.com';

const generateSitemap = async (
  flatsIds: string[],
  searchOptionsText: string[]
) => {
  const pages = await globby([
    'pages/**/*.tsx',
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!pages/generate-sitemap.tsx',
    '!pages/buscar.tsx',
    '!pages/pisos/**',
    '!pages/estado-suscripcion/**',
  ]);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const path = page.replace('pages', '').replace('.tsx', '');
      const route = path === '/index' ? '' : path;

      return `<url>
    <loc>${`${SITE_URL}${route}`}</loc>
  </url>
  `;
    })
    .join('')}
  ${flatsIds
    .map((flatId) => {
      return `<url>
    <loc>${`${SITE_URL}/pisos/${flatId}`}</loc>
  </url>
  `;
    })
    .join('')}
  ${searchOptionsText
    .map((searchOptionText) => {
      return `<url>
    <loc>${`${SITE_URL}/buscar?q=${searchOptionText}`}</loc>
  </url>
  `;
    })
    .join('')}
</urlset>`;
};

const GenerateSitemap: NextPage = () => {
  return null;
};

export const getStaticProps: GetStaticProps = async () => {
  const flats = await Flat.getFlats();
  const searchOptions = computeSearchOptions(flats);
  const sitemap = await generateSitemap(
    flats.map((flat) => flat.id),
    searchOptions.map((option) => option.text)
  );

  const fs = require('fs');
  fs.writeFileSync('public/sitemap.xml', sitemap);

  return {
    props: {},
  };
};

export default GenerateSitemap;
