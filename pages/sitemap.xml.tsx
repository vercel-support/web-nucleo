import { NextPage, GetServerSideProps } from 'next';
import globby from 'globby';

import Flat from '../backend/salesforce/flat';

const SITE_URL = 'https://www.inmobiliarianucleo.com';

const createSitemap = async (flatsIds: string[]) => {
  const pages = await globby([
    'pages/**/*.tsx',
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!pages/sitemap.xml.tsx',
    '!pages/pisos/**',
  ]);
  console.log(pages);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => {
        const path = page.replace('pages', '').replace('.tsx', '');
        const route = path === '/index' ? '' : path;

        return `
          <url>
            <loc>${`${SITE_URL}${route}`}</loc>
          </url>
        `;
      })}
      ${flatsIds
        .map((flatId) => {
          return `
            <url>
              <loc>${`${SITE_URL}/pisos/${flatId}`}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
};

const Sitemap: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const flats = await Flat.getFlats();
  const sitemap = await createSitemap(flats.map((flat) => flat.id));

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
