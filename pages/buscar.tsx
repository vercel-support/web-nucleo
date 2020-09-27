import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col } from 'antd';

import { IFlat } from '../common/model/flat.model';
import useI18n from '../common/hooks/useI18n';
import useSearchService from '../common/hooks/searchService';
import { deserializeMultiple } from '../common/helpers/serialization';
import Flat from '../backend/salesforce/flat';
import { Title } from '../components/search';
import {
  Header,
  Footer,
  SearchBar,
  ResultsSection,
} from '../components/shared';

interface StaticProps {
  flats: string;
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
  background-color: red;
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

const ResultsInfoSection = styled.div<{ resultsCount: number }>`
  height: ${(props) =>
    props.resultsCount > 0
      ? 'unset'
      : `calc(
    100vh - ${props.theme.headerHeight} -
      ${props.theme.footerHeight} - ${searchBarSectionPaddingTop} -
      ${searchBarSectionPaddingBottom} - ${searchBarHeight}
  )`};
  margin-bottom: ${(props) => (props.resultsCount > 0 ? '16px' : '0')};
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

const BuscarPage = ({ flats, theme }: Props): JSX.Element => {
  const i18n = useI18n();
  const searchService = useSearchService();

  const [results, setResults] = useState([] as IFlat[]);
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  useEffect(() => {
    searchService.init(deserializeMultiple(flats, IFlat), setResults);
  }, []);

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

  return (
    <Layout id={layoutId}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {`${
            openSearch
              ? i18n.t('search.title.open', { query })
              : i18n.t('search.title.closed', { query })
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
              const newOpenSearch = true;
              setOpenSearch(newOpenSearch);
              setQuery(value);
              setAutoCompleteValue(value);
              searchService.updateResults(newOpenSearch, value);
            }}
            onSelect={(option) => {
              const newOpenSearch = false;
              const newQuery = option.text;
              setOpenSearch(newOpenSearch);
              setQuery(newQuery);
              setAutoCompleteValue(newQuery);
              searchService.updateResults(newOpenSearch, newQuery);
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
          {results.length > 0 && (
            <Title openSearch={openSearch} query={query} />
          )}
          <ResultsSection flats={results} />
          <ResultsInfoSection resultsCount={results.length}>
            <Row justify="center">
              <Col>
                {results.length > 0
                  ? i18n.t('search.messages.resultsInfo', {
                      resultsCount: results.length,
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

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);

  return {
    props: {
      flats: serializedFlats,
    },
  };
};

export default withTheme(BuscarPage);
