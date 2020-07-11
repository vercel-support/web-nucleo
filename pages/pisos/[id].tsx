import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { WithTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';
import {
  ImageCarousel,
  Summary,
  Description,
  FeaturesCard,
  RequestInfoButton,
} from '../../components/flatDetail';
import { Header, Footer } from '../../components/shared';

const { withTranslation } = nextI18Next;

interface StaticProps {
  flat: string;
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
  margin-top: ${(props) => props.theme.headerHeight};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
`;

const SummarySection = styled.div`
  margin-top: 2rem;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const DescriptionSection = styled.div`
  margin-top: 2rem;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
  }
`;

const RequestInfoSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const FlatDetailPage = ({ flat, t }: Props): JSX.Element => {
  const deserializedFlat = Flat.deserializeResult(flat);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t('flatDetail.title')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Heebo"
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
        <ImageCarousel flat={deserializedFlat} />
        <SummarySection>
          <Summary flat={deserializedFlat} />
        </SummarySection>
        <DescriptionSection>
          <Row gutter={[80, 24]}>
            <Col xs={24} lg={14} xl={15}>
              <Description flat={deserializedFlat} />
            </Col>
            <Col xs={24} lg={10} xl={9}>
              <FeaturesCard flat={deserializedFlat} />
            </Col>
          </Row>
        </DescriptionSection>
        <RequestInfoSection>
          <Row>
            <Col
              xs={{ span: 20, offset: 2 }}
              sm={{ span: 12, offset: 6 }}
              lg={{ span: 6, offset: 2 }}
            >
              <RequestInfoButton />
            </Col>
          </Row>
        </RequestInfoSection>
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const flats: Flat[] = require('../../public/fixtures/flats.json');

  const paths = flats.map((flat) => ({
    params: { id: flat.id + '' },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  // const flat = await Flat.getFlat(+params.id);
  // const serializedFlats = Flat.serialize(flats);

  const flats: Flat[] = require('../../public/fixtures/flats.json');
  const flat = flats.filter((f) => f.id === +params.id)[0];
  const serializedFlat = JSON.stringify(flat);

  return {
    props: {
      flat: serializedFlat,
    },
  };
};

export default withTranslation('common')(FlatDetailPage);
