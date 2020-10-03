import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { IContact } from '../common/model/mailchimp/contact.model';
import { IFlat } from '../common/model/flat.model';
import useI18n from '../common/hooks/useI18n';
import useSearchService, {
  computeSearchOptions,
} from '../common/hooks/searchService';
import useMailchimpService from '../common/hooks/mailchimpService';
import { deserializeMultiple } from '../common/helpers/serialization';
import Flat from '../backend/salesforce/flat';
import { BlogShowcase, Hero, NewsletterSection } from '../components/home';
import {
  Header,
  Footer,
  SearchBar,
  FlatsDisplayPlaceholder,
} from '../components/shared';

interface StaticProps {
  serializedFlats: string;
  serializedSearchOptions: string;
}

type Props = StaticProps;

const FlatsDisplayContainer = styled.div`
  background-color: ${(props) => props.theme.colors.grey};
  padding-top: 100px;
  padding-bottom: 70px;
`;

const FlatsDisplay = dynamic(
  () => import('../components/shared/flatsDisplay/flatsDisplay'),
  {
    ssr: false,
    loading: () => <FlatsDisplayPlaceholder />,
  }
);

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

const SearchBarSection = styled.div`
  margin-top: 80px;
  margin-bottom: 48px;
  margin-left: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;

export const Home = ({
  serializedFlats,
  serializedSearchOptions,
}: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const searchService = useSearchService();
  const mailchimpService = useMailchimpService();

  const flats = deserializeMultiple(serializedFlats, IFlat);

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

  const onSubscribeButtonClicked = (email: string) => {
    const contact: IContact = { EMAIL: email };
    mailchimpService.subscribe(contact, router, i18n);
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
      <Header />

      <Content>
        <Hero />
        <SearchBarSection>
          <SearchBar
            height="48px"
            value={autoCompleteValue}
            options={searchService.getSearchOptions(autoCompleteValue)}
            onValueChange={setAutoCompleteValue}
            onSearch={(value) => {
              if (!value) {
                return;
              }
              onSearch(value);
            }}
            onSelect={(option) => {
              onSearch(option.text);
            }}
          />
        </SearchBarSection>
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={flats}
            title={i18n.t('home.section-flats-title')}
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

  const searchOptions = computeSearchOptions(flats);

  return {
    props: {
      serializedFlats,
      serializedSearchOptions: JSON.stringify(searchOptions),
    },
  };
};

export default Home;
