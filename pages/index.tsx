import { WithTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import nextI18Next from '../i18n';

import Flat from '../backend/salesforce/flat';
import { FlatsDisplay, BlogShowcase, Hero } from '../components/home';
import { Header, Footer } from '../components/shared';

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
`;

const Content = styled.main`
  flex: auto;
`;

export const Home = ({ flats, t }: Props): JSX.Element => {
  const deserializedFlats = Flat.deserializeResults(flats);

  return (
    <Layout>
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Content>
        <Hero />
        <FlatsDisplay flats={deserializedFlats} />
        <BlogShowcase />
      </Content>
      <Footer />
    </Layout>
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
