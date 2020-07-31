import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { WithTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import nextI18Next from '../../i18n';
import { IContact } from '../../common/model/mailchimp/contact.model';
import Flat from '../../backend/salesforce/flat';
import { useMailchimpService } from '../../services/mailchimpService';
import {
  ImageCarousel,
  Summary,
  Description,
  FeaturesCard,
  RequestInfoButton,
  Gallery,
} from '../../components/flatDetail';
import { FlatsDisplayPlaceholder } from '../../components/home';
import { Header, Footer } from '../../components/shared';

const { withTranslation } = nextI18Next;

interface StaticProps {
  flat: string;
  recommendedFlats: string;
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
  margin-top: 3rem;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
  }
`;

const DescriptionRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const FeaturesCardContainer = styled.div`
  margin-top: 0;
  @media ${(props) => props.theme.breakpoints.lgu} {
    margin-top: 34px;
  }
`;

const RequestInfoSection = styled.div`
  margin-top: 2rem;
`;

const FlatsDisplayContainer = styled.div`
  padding-top: 3rem;
  padding-bottom: 1rem;
`;

const FlatsDisplay = dynamic(
  () => import('../../components/home/flatsDisplay'),
  {
    ssr: false,
    loading: () => <FlatsDisplayPlaceholder />,
  }
);

const FlatDetailPage = ({ flat, recommendedFlats, t }: Props): JSX.Element => {
  const mailchimpService = useMailchimpService();

  const deserializedFlat = Flat.deserializeResult(flat);
  const deserializedRecommendedFlats = Flat.deserializeResults(
    recommendedFlats
  );

  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const onBuyButtonClicked = async (
    name: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<void> => {
    try {
      const contact: IContact = { EMAIL: email };
      if (name) {
        contact.FNAME = name;
      }
      if (lastName) {
        contact.LNAME = lastName;
      }
      if (phone) {
        contact.PHONE = phone;
      }
      await mailchimpService.subscribe(contact);
    } catch (error) {
      // TODO: manage error
    }
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {t('flatDetail.title', {
            type: deserializedFlat.type,
            city: deserializedFlat.city,
            sqrMeters: deserializedFlat.sqrMeters,
            dormitories: deserializedFlat.rooms,
            bathrooms: deserializedFlat.bathrooms,
            price: deserializedFlat.price,
            address: deserializedFlat.address,
          })}
        </title>
        <meta
          name="description"
          content={t('flatDetail.description', {
            type: deserializedFlat.type,
            address: deserializedFlat.address,
            city: deserializedFlat.city,
            sqrMeters: deserializedFlat.sqrMeters,
            dormitories: deserializedFlat.rooms,
            bathrooms: deserializedFlat.bathrooms,
            price: deserializedFlat.price,
          })}
        />
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
        <ImageCarousel
          flat={deserializedFlat}
          onShowAllPhotosButtonClik={() => setIsGalleryVisible(true)}
        />
        <SummarySection>
          <Summary flat={deserializedFlat} />
        </SummarySection>
        <DescriptionSection>
          <DescriptionRow gutter={[80, 48]}>
            <Col xs={24} lg={14} xl={15}>
              <Description flat={deserializedFlat} />
            </Col>
            <Col xs={24} lg={10} xl={9}>
              <FeaturesCardContainer>
                <FeaturesCard flat={deserializedFlat} />
                <RequestInfoSection>
                  <Row>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 18, offset: 3 }}
                      md={{ span: 12, offset: 6 }}
                      lg={{ span: 24, offset: 0 }}
                    >
                      <RequestInfoButton
                        onBuyButtonClicked={onBuyButtonClicked}
                      />
                    </Col>
                  </Row>
                </RequestInfoSection>
              </FeaturesCardContainer>
            </Col>
          </DescriptionRow>
        </DescriptionSection>
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={deserializedRecommendedFlats}
            title={t('flatDetail.messages.recommendedFlats')}
            arrows={false}
          />
        </FlatsDisplayContainer>
        <Gallery
          flat={deserializedFlat}
          visible={isGalleryVisible}
          onCancel={() => setIsGalleryVisible(false)}
        />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const flats = await Flat.getFlats();

  const paths = flats.map((flat) => ({
    params: { id: flat.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  // const flat = await Flat.getFlat(+params.id);
  // const serializedFlats = Flat.serialize(flats);

  const flats = await Flat.getFlats();
  const flatIndex = flats.findIndex((f) => f.id === params.id);
  const flat = flats[flatIndex];
  const recommendedFlats = [
    flats[(flatIndex + 1) % flats.length],
    flats[(flatIndex + 2) % flats.length],
    flats[(flatIndex + 3) % flats.length],
    flats[(flatIndex + 4) % flats.length],
  ];
  const serializedFlat = JSON.stringify(flat);
  const serializedRecommendedFlats = JSON.stringify(recommendedFlats);

  return {
    props: {
      flat: serializedFlat,
      recommendedFlats: serializedRecommendedFlats,
    },
  };
};

export default withTranslation('common')(FlatDetailPage);
