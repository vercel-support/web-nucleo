import { WithTranslation } from 'next-i18next';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import nextI18Next from '../i18n';
import Flat from '../backend/salesforce/flat';

import { salesforceClient } from '../backend/salesforce';

const { withTranslation } = nextI18Next;

interface StaticProps {
  flats: string;
}

type Props = StaticProps & WithTranslation;

export const Home = ({ flats, t }): JSX.Element => {
  const flats_list = Flat.deserialize_results(flats);

  return (
    <div className="container">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Web Núcleo</h1>
        <ul>
          {flats_list.map((flat) => {
            return (
              <li key={flat.name}>
                {flat.name}
                {flat.picture_urls.map((url) => {
                  return <img key={url} src={url}></img>;
                })}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  await salesforceClient.init();

  const flats = await Flat.getFlats();

  return {
    props: {
      flats: Flat.serialize_results(flats),
    },
  };
};

export default withTranslation('common')(Home);
