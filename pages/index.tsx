import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { WithTranslation } from 'next-i18next';
import styled from 'styled-components';

import nextI18Next from '../i18n';
import Flat from '../backend/salesforce/flat';
import {
  BlogShowcase,
  Hero,
  NewsletterSection,
  FlatsDisplayPlaceholder,
} from '../components/home';
import { Header, Footer } from '../components/shared';

const FlatsDisplayContainer = styled.div`
  background-color: #f2f2f2;
  padding-top: 100px;
  padding-bottom: 70px;
`;

const FlatsDisplay = dynamic(() => import('../components/home/flatsDisplay'), {
  ssr: false,
  loading: () => <FlatsDisplayPlaceholder />,
});

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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t('home.description')} />
        <meta name="robots" content="index, follow" />
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {typeof window === 'undefined' && (
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
         *, *::before, *::after {
           transition: none!important;
         }
         `,
            }}
          />
        )}
        <style> </style>
      </Head>
      <Header />

      <Content>
        <Hero />
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={deserializedFlats}
            title={t('section-flats-title')}
          />
        </FlatsDisplayContainer>
        <BlogShowcase />
        <NewsletterSection />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);

  return {
    props: {
      flats: serializedFlats,
    },
  };
};

export default withTranslation('common')(Home);
