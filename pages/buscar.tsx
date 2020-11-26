import { useState, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Row, Col, Button } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';

import { IFlat } from '../common/model/flat.model';
import { IFilter } from '../common/model/filter.model';
import useI18n from '../common/hooks/useI18n';
import useSearchService, {
  computeSearchOptions,
} from '../common/hooks/searchService';
import Flat from '../backend/salesforce/flat';
import {
  Title,
  FiltersModal,
  SearchMap,
  MiniFlatCard,
} from '../components/search';
import {
  Header,
  Footer,
  SearchBar,
  ResultsSection,
} from '../components/shared';

interface StaticProps {
  serializedFlats: string;
  serializedSearchOptions: string;
}

type Props = StaticProps & {
  theme: DefaultTheme;
};

const layoutId = 'buscarLayoutId';
const searchBarSectionId = 'buscarSearchBarSection';
const mapSectionId = 'buscarMapSection';
const showMapButtonSectionId = 'buscarShowMapButtonSection';
const transparentMddSectionId = 'buscarTransparentMddSection';
const scrollableSectionId = 'buscarScrollableSection';
const resultsInfoSectionId = 'buscarResultsInfoSection';
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

  &.no-results {
    #${mapSectionId} {
      display: none;
    }

    #${scrollableSectionId} {
      margin-top: calc(
        ${searchBarHeight} + ${searchBarSectionPaddingTop} +
          ${searchBarSectionPaddingBottom}
      );
      padding: 0;
      border-radius: 0;
    }

    #${resultsInfoSectionId} {
      height: ${(props) => `calc(
        100vh - ${props.theme.headerHeight} -
          ${props.theme.footerHeight} - ${searchBarSectionPaddingTop} -
          ${searchBarSectionPaddingBottom} - ${searchBarHeight}
      )`};
      margin: 0;
    }
  }

  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;

    &.no-results {
      #${resultsInfoSectionId} {
        height: ${(props) => `calc(
          100vh - ${props.theme.footerHeight} - ${searchBarSectionPaddingTop} -
            ${searchBarSectionPaddingBottom} - ${searchBarHeight}
        )`};
      }
    }
  }
`;

const SearchBarSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.theme.grid.getGridColumns(14, -1)};
  padding-top: ${searchBarSectionPaddingTop};
  padding-bottom: ${searchBarSectionPaddingBottom};
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  z-index: 100;
  @media ${(props) => props.theme.breakpoints.mdd} {
    width: 100%;
  }

  &.${headerOutOfScreenClass} {
    position: fixed;
  }
`;

const MapSection = styled.div`
  background-color: grey;
  position: fixed;
  top: ${(props) => props.theme.headerHeight};
  bottom: 0;
  left: ${(props) => props.theme.grid.getGridColumns(14, -1)};
  right: 0;
  z-index: 10;
  @media ${(props) => props.theme.breakpoints.mdd} {
    top: 0;
    bottom: unset;
    height: calc(100vh - 80px);
    left: 0;
  }
`;

const MiniFlatCardsSection = styled.div`
  position: absolute;
  bottom: 64px;
  left: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  @media ${(props) => props.theme.breakpoints.lgu} {
    display: none;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const ShowMapButtonSection = styled.div`
  position: fixed;
  left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  bottom: 32px;
  z-index: 100;
  display: none;
`;

const ShowMapButtonRow = styled(Row)`
  width: 100%;
`;

const TransparentMddSection = styled.div`
  height: calc(100vh - 120px);
  pointer-events: none;
  @media ${(props) => props.theme.breakpoints.lgu} {
    display: none;
  }
`;

const ScrollableSection = styled.div`
  position: relative;
  margin-top: calc(
    ${searchBarHeight} + ${searchBarSectionPaddingTop} +
      ${searchBarSectionPaddingBottom}
  );
  width: ${(props) => props.theme.grid.getGridColumns(14, -1)};
  background-color: white;
  z-index: 20;
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
    width: 100%;
    padding-top: 40px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }
`;

const ResultsInfoSection = styled.div`
  padding-bottom: 16px;
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

const ResultsInfoText = styled.div`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
    line-height: 16px;
  }
`;

const LoadMoreButtonRow = styled(Row)`
  margin-top: 24px;
`;

const LoadMoreButton = styled(Button)`
  width: 100%;
`;

const BuscarPage = ({
  serializedFlats,
  serializedSearchOptions,
  theme,
}: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const searchService = useSearchService();

  const resultsSectionRef = useRef(null);

  const isMdd = useMediaQuery({ query: theme.breakpoints.mdd });

  const [currentResults, setCurrentResults] = useState([] as IFlat[]);
  const [focusedFlatIndex, setFocusedFlatIndex] = useState(0);
  const [q, setQ] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState(q);
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);

  const setFocusedFlatIndexFromMap = (index: number) => {
    setFocusedFlatIndex(index);
    if (
      !isMdd &&
      resultsSectionRef.current &&
      resultsSectionRef.current.firstChild &&
      resultsSectionRef.current.firstChild.children &&
      resultsSectionRef.current.firstChild.children.length > index
    ) {
      const focusedEl = resultsSectionRef.current.firstChild.children[index];
      focusedEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const updateQ = (newQ: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          q: newQ,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const updateFilter = (filter: IFilter) => {
    const query = searchService.generateQueryFromFilter(filter);
    router.push(
      {
        pathname: router.pathname,
        query: {
          q: router.query.q,
          ...query,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const showMap = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (headerHeight: number, footerHeight: number) => {
    const layoutElement = document.getElementById(layoutId);
    const transparentMddSectionElement = document.getElementById(
      transparentMddSectionId
    );

    const searchBarSectionElement = document.getElementById(searchBarSectionId);
    if (searchBarSectionElement) {
      if (
        !searchBarSectionElement.className.includes(headerOutOfScreenClass) &&
        (isMdd || window.scrollY >= headerHeight)
      ) {
        searchBarSectionElement.className =
          searchBarSectionElement.className + ' ' + headerOutOfScreenClass;
      }
      if (
        searchBarSectionElement.className.includes(headerOutOfScreenClass) &&
        !isMdd &&
        window.scrollY < headerHeight
      ) {
        searchBarSectionElement.className = searchBarSectionElement.className.replace(
          headerOutOfScreenClass,
          ''
        );
      }
      if (transparentMddSectionElement) {
        searchBarSectionElement.style.setProperty(
          'background',
          `${
            isMdd && window.scrollY <= transparentMddSectionElement.clientHeight
              ? 'transparent'
              : 'linear-gradient( 180deg,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.75) 75%,rgba(255,255,255,0) 100% )'
          }`
        );
      }
    }

    const mapSectionElement = document.getElementById(mapSectionId);
    if (!isMdd && layoutElement && mapSectionElement) {
      const ammountOfHeaderVisible = headerHeight - window.scrollY;
      if (ammountOfHeaderVisible > 0) {
        mapSectionElement.style.setProperty(
          'top',
          `${ammountOfHeaderVisible}px`
        );
      }
      if (ammountOfHeaderVisible <= 0) {
        mapSectionElement.style.setProperty('top', '0');
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

    const showMapButtonSectionElement = document.getElementById(
      showMapButtonSectionId
    );
    if (transparentMddSectionElement && showMapButtonSectionElement) {
      showMapButtonSectionElement.style.setProperty(
        'display',
        `${
          isMdd && window.scrollY > transparentMddSectionElement.clientHeight
            ? 'block'
            : 'none'
        }`
      );
    }
  };

  useEffect(() => {
    searchService.init(
      JSON.parse(serializedFlats),
      JSON.parse(serializedSearchOptions),
      setCurrentResults
    );
  }, []);

  useEffect(() => {
    const headerHeight = +theme.headerHeight.replace('px', '');
    const footerHeight = +theme.footerHeight.replace('px', '');

    window.addEventListener('scroll', () =>
      handleScroll(headerHeight, footerHeight)
    );

    return () =>
      window.removeEventListener('scroll', () =>
        handleScroll(headerHeight, footerHeight)
      );
  }, []);

  useEffect(() => {
    const auxQ = router.query.q as string;

    if (!auxQ) {
      return;
    }

    setQ(auxQ);
    setAutoCompleteValue(auxQ);
    searchService.computeResults(router.query);
  }, [router.query]);

  const highlightedCoordinates = router.query.mapCoords ? JSON.parse(router.query.mapCoords as string) : undefined;
  return (
    <Layout id={layoutId}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {`${
            searchService.isOpenSearch()
              ? i18n.t('search.title.open', { query: q })
              : i18n.t('search.title.closed', { query: q })
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
      {!isMdd && <Header />}

      <Content
        className={searchService.getResultsCount() === 0 ? 'no-results' : ''}
      >
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
              updateQ(value);
            }}
            onSelect={(option) => {
              updateQ(option.text);
            }}
            onFiltersButtonClick={() => {
              setFiltersModalVisible(true);
            }}
            hasFilters={Object.keys(router.query).length > 1}
            backButton={isMdd}
            inputPadding={isMdd ? '0' : undefined}
          />
        </SearchBarSection>
        <MapSection id={mapSectionId}>
          <SearchMap
            flats={currentResults}
            focusedFlatIndex={focusedFlatIndex}
            onMarkerClick={setFocusedFlatIndexFromMap}
            highlightedCoordinates={highlightedCoordinates}
          />
          {currentResults.length > 0 && (
            <MiniFlatCardsSection>
              <MiniFlatCard flat={currentResults[focusedFlatIndex]} />
            </MiniFlatCardsSection>
          )}
        </MapSection>
        <ShowMapButtonSection id={showMapButtonSectionId}>
          <ShowMapButtonRow justify="end">
            <Col>
              <Button
                type="primary"
                icon={<EnvironmentFilled />}
                onClick={showMap}
              >
                {i18n.t('search.actions.showMap')}
              </Button>
            </Col>
          </ShowMapButtonRow>
        </ShowMapButtonSection>
        <TransparentMddSection id={transparentMddSectionId} />
        <ScrollableSection id={scrollableSectionId}>
          {currentResults.length > 0 && (
            <Title
              openSearch={searchService.isOpenSearch()}
              query={q}
              resultsCount={searchService.getResultsCount()}
              orderBy={searchService.getOrderBy()}
              onOrderByChange={(orderBy) => searchService.setOrderBy(orderBy)}
            />
          )}
          <ResultsSection
            flats={currentResults}
            focusedFlatIndex={focusedFlatIndex}
            focusedCardBackgroundColor="#f8f8f8"
            cardBackgroundColor="white"
            parentRef={resultsSectionRef}
            onFlatHover={(_flat, index) => {
              setFocusedFlatIndex(index);
            }}
          />
          <ResultsInfoSection id={resultsInfoSectionId}>
            <ResultsInfoText>
              {searchService.getPageSize() > 0
                ? i18n.t('search.messages.resultsInfo', {
                    pageSize: searchService.getPageSize(),
                    resultsCount: searchService.getResultsCount(),
                  })
                : i18n.t('search.messages.noResults')}
            </ResultsInfoText>
            {searchService.getPageSize() < searchService.getResultsCount() && (
              <LoadMoreButtonRow justify="center">
                <Col
                  xs={{ span: 20 }}
                  sm={{ span: 16 }}
                  md={{ span: 12 }}
                  lg={{ span: 10 }}
                  xl={{ span: 8 }}
                >
                  <LoadMoreButton
                    type="primary"
                    onClick={() => {
                      searchService.incrementPageSize();
                      setTimeout(() =>
                        handleScroll(
                          +theme.headerHeight.replace('px', ''),
                          +theme.footerHeight.replace('px', '')
                        )
                      );
                    }}
                  >
                    <span>{i18n.t('search.actions.loadMore')}</span>
                  </LoadMoreButton>
                </Col>
              </LoadMoreButtonRow>
            )}
          </ResultsInfoSection>
        </ScrollableSection>

        <FiltersModal
          visible={filtersModalVisible}
          onOk={(filter) => {
            updateFilter(filter);
            setFiltersModalVisible(false);
          }}
          onCancel={() => {
            setFiltersModalVisible(false);
          }}
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

export default withTheme(BuscarPage);
