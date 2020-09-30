import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import useSearchService, {
  computeResults,
  computeSearchOptions,
} from '../../common/hooks/searchService';
import Flat from '../../backend/salesforce/flat';
import { Title } from '../../components/search';
import {
  Header,
  Footer,
  SearchBar,
  ResultsSection,
} from '../../components/shared';

interface StaticProps {
  serializedResults: string;
  serializedSearchOptions: string;
  openSearch: boolean;
}

type Props = StaticProps & {
  theme: DefaultTheme;
};

const layoutId = 'buscarLayoutId';
const searchBarSectionId = 'buscarSearchBarSection';
const mapSectionId = 'buscarMapSection';
const headerOutOfScreenClass = 'header-out-of-screen';
const searchBarSectionPaddingTop = '16px';
const searchBarSectionPaddingBottom = '32px';
const searchBarHeight = '48px';

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
  margin-top: ${(props) => props.theme.headerHeight};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
`;

const SearchBarSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: ${(props) => props.theme.grid.getGridColumns(10, -1)};
  padding-top: ${searchBarSectionPaddingTop};
  padding-bottom: ${searchBarSectionPaddingBottom};
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  z-index: 100;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.75) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  @media ${(props) => props.theme.breakpoints.mdd} {
    right: 0;
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }

  &.${headerOutOfScreenClass} {
    position: fixed;
  }
`;

const MapSection = styled.div`
  background-color: grey;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.theme.grid.getGridColumns(14, -1)};
  right: 0;
  z-index: 100;
  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }

  &.${headerOutOfScreenClass} {
    position: fixed;
  }
`;

const ScrollableSection = styled.div`
  margin-top: calc(
    ${searchBarHeight} + ${searchBarSectionPaddingTop} +
      ${searchBarSectionPaddingBottom}
  );
  margin-right: ${(props) => props.theme.grid.getGridColumns(10, -1)};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-right: 0;
  }
`;

const ResultsInfoSection = styled.div<{ pageSize: number }>`
  height: ${(props) =>
    props.pageSize > 0
      ? 'unset'
      : `calc(
    100vh - ${props.theme.headerHeight} -
      ${props.theme.footerHeight} - ${searchBarSectionPaddingTop} -
      ${searchBarSectionPaddingBottom} - ${searchBarHeight}
  )`};
  margin-bottom: ${(props) => (props.pageSize > 0 ? '16px' : '0')};
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;

const BuscarPage = ({
  serializedResults,
  serializedSearchOptions,
  openSearch,
  theme,
}: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const searchService = useSearchService();

  const [currentResults, setCurrentResults] = useState([] as IFlat[]);
  const [autoCompleteValue, setAutoCompleteValue] = useState(
    router.query.query as string
  );
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    if (!router.isFallback) {
      const deserializedResults = JSON.parse(serializedResults);
      searchService.init(
        deserializedResults,
        JSON.parse(serializedSearchOptions),
        setCurrentResults
      );
      setPageSize(Math.min(10, deserializedResults.length));
    }
  }, [router.isFallback]);

  useEffect(() => {
    const headerHeight = +theme.headerHeight.replace('px', '');
    const footerHeight = +theme.footerHeight.replace('px', '');

    // TODO: debounce
    const handleScroll = () => {
      const layoutElement = document.getElementById(layoutId);

      const searchBarSectionElement = document.getElementById(
        searchBarSectionId
      );
      if (searchBarSectionElement) {
        if (
          !searchBarSectionElement.className.includes(headerOutOfScreenClass) &&
          window.scrollY >= headerHeight
        ) {
          searchBarSectionElement.className =
            searchBarSectionElement.className + ' ' + headerOutOfScreenClass;
        }
        if (
          searchBarSectionElement.className.includes(headerOutOfScreenClass) &&
          window.scrollY < headerHeight
        ) {
          searchBarSectionElement.className = searchBarSectionElement.className.replace(
            headerOutOfScreenClass,
            ''
          );
        }
      }

      const mapSectionElement = document.getElementById(mapSectionId);
      if (layoutElement && mapSectionElement) {
        if (
          !mapSectionElement.className.includes(headerOutOfScreenClass) &&
          window.scrollY >= headerHeight
        ) {
          mapSectionElement.className =
            mapSectionElement.className + ' ' + headerOutOfScreenClass;
        }
        if (
          mapSectionElement.className.includes(headerOutOfScreenClass) &&
          window.scrollY < headerHeight
        ) {
          mapSectionElement.className = mapSectionElement.className.replace(
            headerOutOfScreenClass,
            ''
          );
        }

        const ammountOfFooterVisible =
          window.scrollY +
          window.innerHeight +
          footerHeight -
          layoutElement.clientHeight;
        if (ammountOfFooterVisible > 0) {
          mapSectionElement.style.setProperty(
            'bottom',
            `${ammountOfFooterVisible}px`
          );
        }
        if (ammountOfFooterVisible <= 0) {
          mapSectionElement.style.setProperty('bottom', '0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCurrentResults = () => {
    return currentResults.slice(0, pageSize);
  };

  const isOpenSearch = () => {
    return router.isFallback || openSearch;
  };

  return (
    <Layout id={layoutId}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {`${
            isOpenSearch()
              ? i18n.t('search.title.open', { query: router.query.query })
              : i18n.t('search.title.closed', { query: router.query.query })
          } | Inmobiliaria Núcleo`}
        </title>
        <meta name="description" content={i18n.t('search.metaDescription')} />
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
        <SearchBarSection id={searchBarSectionId}>
          <SearchBar
            height={searchBarHeight}
            value={autoCompleteValue}
            options={searchService.getSearchOptions(autoCompleteValue)}
            onValueChange={setAutoCompleteValue}
            onSearch={(value) => {
              if (!value) {
                return;
              }
              setAutoCompleteValue(value);
              router.push(`/buscar/${value}`);
            }}
            onSelect={(option) => {
              const newQuery = option.text;
              setAutoCompleteValue(newQuery);
              router.push(`/buscar/${newQuery}`);
            }}
            onFiltersButtonClick={() => {
              // TODO
              console.log('onFiltersButtonClick');
            }}
          />
        </SearchBarSection>
        <MapSection id={mapSectionId}>
          <div>TODO: map</div>
        </MapSection>
        <ScrollableSection>
          {getCurrentResults().length > 0 && (
            <Title
              openSearch={isOpenSearch()}
              query={router.query.query as string}
            />
          )}
          <ResultsSection flats={getCurrentResults()} />
          <ResultsInfoSection pageSize={pageSize}>
            <Row justify="center">
              <Col>
                {pageSize > 0
                  ? i18n.t('search.messages.resultsInfo', {
                      pageSize,
                    })
                  : i18n.t('search.messages.noResults')}
              </Col>
            </Row>
          </ResultsInfoSection>
        </ScrollableSection>
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const flats = await Flat.getFlats();
  const searchOptions = computeSearchOptions(flats);

  const paths = searchOptions.map((searchOption) => ({
    params: { query: searchOption.text },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const flats = await Flat.getFlats();

  const searchOptions = computeSearchOptions(flats);

  const openSearch = searchOptions.every(
    (searchOption) => searchOption.text !== params.query
  );
  const results = Flat.serialize(
    computeResults(flats, openSearch, params.query as string)
  );

  return {
    props: {
      serializedResults: results,
      serializedSearchOptions: JSON.stringify(searchOptions),
      openSearch,
    },
  };
};

export default withTheme(BuscarPage);
