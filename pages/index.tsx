import { WithTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import nextI18Next from '../i18n';

import Flat from '../backend/salesforce/flat';
import { BlogShowcase, Hero, NewsletterSection } from '../components/home';
import { Header, Footer } from '../components/shared';
import dynamic from 'next/dynamic';

const FlatsDisplay = dynamic(() => import('../components/home/flatsDisplay'));

const { withTranslation } = nextI18Next;

interface StaticProps {
  flats: string;
}

type Props = StaticProps & WithTranslation;

const Layout = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const Content = styled.main`
  flex: auto;
`;

export const Home = ({ flats, t }: Props): JSX.Element => {
  const deserializedFlats = Flat.deserializeResults(flats);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Heebo"
          rel="stylesheet"
        />
      </Head>
      <Header />

      <Content>
        <Hero />
        <FlatsDisplay flats={deserializedFlats} />
        <BlogShowcase />
        <NewsletterSection />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // const flats = await Flat.getFlats();
  // const serializedFlats = Flat.serializeResults(flats);

  const flats = require('../public/fixtures/flats.json');
  const serializedFlats = JSON.stringify(flats);

  return {
    props: {
      flats: serializedFlats,
    },
  };
};

export default withTranslation('common')(Home);
