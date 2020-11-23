import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { IContact } from '../common/model/mailchimp/contact.model';
import { IFlat } from '../common/model/flat.model';
import { IZone } from '../common/model/zone.model';
import useI18n from '../common/hooks/useI18n';
import useSearchService, {
  computeSearchOptions,
} from '../common/hooks/searchService';
import useMailchimpService from '../common/hooks/mailchimpService';
import { deserializeMultiple } from '../common/helpers/serialization';
import Flat from '../backend/salesforce/flat';
import { BlogShowcase, Hero, NewsletterSection, HierarchicalMap } from '../components/home';
import { Header, Footer, FlatsDisplay } from '../components/shared';

interface StaticProps {
  serializedFlats: string;
  serializedSearchOptions: string;
  zones: IZone[];
}

type Props = StaticProps;

const FlatsDisplayContainer = styled.div`
  background-color: ${(props) => props.theme.colors.grey};
`;

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
  position: relative;
  flex: auto;
`;

export const Home = ({
  serializedFlats,
  serializedSearchOptions,
  zones
}: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();

  const flats = deserializeMultiple(serializedFlats, IFlat);

  const onSubscribeButtonClicked = (email: string) => {
    const contact: IContact = { EMAIL: email };
    mailchimpService.subscribe(contact, router, i18n);
  };

  const searchService = useSearchService();
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  useEffect(() => {
    searchService.init([], JSON.parse(serializedSearchOptions));
  }, []);

  const onSearch = (q: string) => {
    router.push({
      pathname: '/buscar',
      query: { q },
    });
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('home.title')}</title>
        <meta name="description" content={i18n.t('home.description')} />
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
      <Header hideSellHouseButton={true} />

      <Content>
        <Hero
          autoCompleteValue={autoCompleteValue}
          autoCompleteOptions={searchService.getSearchOptions(
            autoCompleteValue
          )}
          onAutoCompleteValueChange={setAutoCompleteValue}
          onSearch={onSearch}
        />
        <HierarchicalMap zones={zones} />
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={flats}
            title={i18n.t('home.section-flats-title')}
            arrows={true}
          />
        </FlatsDisplayContainer>
        <BlogShowcase />
        <NewsletterSection
          onSubscribeButtonClicked={onSubscribeButtonClicked}
        />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);
  
  const zones = require('../public/fixtures/zones.json') as IZone[];

  const searchOptions = computeSearchOptions(flats);

  return {
    props: {
      serializedFlats,
      serializedSearchOptions: JSON.stringify(searchOptions),
      zones
    },
  };
};

export default Home;
