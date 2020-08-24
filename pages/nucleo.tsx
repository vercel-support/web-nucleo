import Head from 'next/head';
import styled from 'styled-components';

import useI18n from '../common/hooks/useI18n';
import { Header, Footer } from '../components/shared';
import { WhereWeFrom, WhereWeGo, WhoAreWe } from '../components/nucleo';

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

const Banner = styled.img`
  object-fit: cover;
  max-height: 65vh;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: 40vh;
  }
`;

export const Nucleo = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('who-are-we.title')}</title>
        <meta name="description" content={i18n.t('who-are-we.description')} />
        <meta name="robots" content="index, follow" />
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
      </Head>
      <Header alwaysShown dropShadow />

      <Content>
        <WhoAreWe />
        <Banner
          src={require('../public/images/banner_who_are_we.png')}
          alt={i18n.t('who-are-we.title')}
        />
        <WhereWeFrom />
        <WhereWeGo />
      </Content>

      <Footer />
    </Layout>
  );
};

export default Nucleo;
