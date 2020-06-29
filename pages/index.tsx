import { WithTranslation } from 'next-i18next';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import styled from 'styled-components';

import nextI18Next from '../i18n';
import Flat from '../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

interface StaticProps {
  flats: string;
}

type Props = StaticProps & WithTranslation;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const Home = ({ flats, t }: Props): JSX.Element => {
  const flatsList = Flat.deserializeResults(flats);

  return (
    <div>
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Web Núcleo</Title>
        <ul>
          {flatsList.map((flat) => {
            return (
              <li key={flat.name}>
                {flat.name}
                {flat.pictureUrls.map((url) => {
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
  const flats = await Flat.getFlats();

  return {
    props: {
      flats: Flat.serializeResults(flats),
    },
  };
};

export default withTranslation('common')(Home);
