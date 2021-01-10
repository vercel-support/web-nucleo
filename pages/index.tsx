import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import {
  RECOMMENDED_FLATS_MAX_LENGTH,
  RECOMMENDED_FLATS_PER_SEARCH,
} from '../common/consts';
import { IContact } from '../common/model/mailchimp/contact.model';
import { IFlat } from '../common/model/flat.model';
import { ISuggestion } from '../common/model/suggestion.model';
import { IMyPost } from '../common/model/wp/post.model';
import { IZone } from '../common/model/zone.model';
import useI18n from '../common/hooks/useI18n';
import useSearchService, {
  computeResults,
  computeSearchOptions,
  computeSearchType,
  computeFilter,
  getLastSearchs,
} from '../common/hooks/searchService';
import useMailchimpService from '../common/hooks/mailchimpService';
import { deserializeMultiple } from '../common/helpers/serialization';
import { shuffle } from '../common/helpers/array.utils';
import Flat from '../backend/salesforce/flat';
import { getLastPosts } from '../backend/wp';
import { computeZones } from '../backend/geo';
import {
  BlogShowcase,
  Hero,
  NewsletterSection,
  HierarchicalMap,
  PlaceSuggestions,
} from '../components/home';
import { Header, Footer, FlatsDisplay } from '../components/shared';

interface StaticProps {
  serializedFlats: string;
  serializedSearchOptions: string;
  lastPosts: IMyPost[];
  zones: Record<string, IZone>;
  suggestions: ISuggestion[];
}

type Props = StaticProps;

const HierarchicalMapContainer = styled.div`
  padding-top: 3rem;
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-top: 2rem;
  }
  padding-bottom: 32px;
`;

const HierarchicalMapInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};

  @media ${(props) => props.theme.breakpoints.mdd} {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const Divider = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-bottom: 0;
  }
`;

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
  lastPosts,
  zones,
  suggestions,
}: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();
  const searchService = useSearchService();

  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [recommendedFlats, setRecommendedFlats] = useState([] as IFlat[]);

  const flats = deserializeMultiple<IFlat>(serializedFlats);
  const searchOptions = JSON.parse(serializedSearchOptions);

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

  useEffect(() => {
    searchService.init([], searchOptions);

    let auxRecommendedFlats: IFlat[] = [];
    const lastSearchs = getLastSearchs();
    for (const search of lastSearchs) {
      const q = search.q as string;
      const searchType = computeSearchType(q, searchOptions);
      const results = computeResults(
        flats,
        searchType,
        q,
        computeFilter(search)
      ).slice(0, RECOMMENDED_FLATS_PER_SEARCH);
      auxRecommendedFlats.push(
        ...results.filter(
          (flat) => !auxRecommendedFlats.some((f) => flat.id === f.id)
        )
      );
    }
    auxRecommendedFlats = shuffle(auxRecommendedFlats);
    auxRecommendedFlats.push(
      ...shuffle(
        flats
          .filter((flat) => !auxRecommendedFlats.some((f) => flat.id === f.id))
          .slice(0, RECOMMENDED_FLATS_MAX_LENGTH - auxRecommendedFlats.length)
      )
    );
    setRecommendedFlats(auxRecommendedFlats);
  }, []);

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
        <HierarchicalMapContainer>
          <Title>{i18n.t('home.map.title')}</Title>
          <Divider />
          <HierarchicalMapInnerContainer>
            <HierarchicalMap zones={zones} />
            <PlaceSuggestions suggestions={suggestions} />
          </HierarchicalMapInnerContainer>
        </HierarchicalMapContainer>
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={recommendedFlats}
            title={i18n.t('home.section-flats-title')}
            arrows={true}
          />
        </FlatsDisplayContainer>
        <BlogShowcase lastPosts={lastPosts} />
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
  const suggestions = require('../public/fixtures/suggestions.json') as ISuggestion[];

  const searchOptions = computeSearchOptions(flats);

  const lastPosts = await getLastPosts();
  const zones = await computeZones(flats);

  return {
    props: {
      serializedFlats,
      serializedSearchOptions: JSON.stringify(searchOptions),
      lastPosts,
      zones,
      suggestions,
    },
  };
};

export default Home;
