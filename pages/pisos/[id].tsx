import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Row, Col, message } from 'antd';

import { IContact } from '../../common/model/mailchimp/contact.model';
import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import useMailchimpService from '../../common/hooks/mailchimpService';
import {
  deserializeMultiple,
  deserializeSingle,
} from '../../common/helpers/serialization';
import Flat from '../../backend/salesforce/flat';
import {
  ImageCarousel,
  Summary,
  Description,
  FeaturesCard,
  RequestInfoButton,
  Gallery,
} from '../../components/flatDetail';
import {
  Header,
  Footer,
  FlatsDisplayPlaceholder,
} from '../../components/shared';

interface StaticProps {
  flat: string;
  recommendedFlats: string;
}

type Props = StaticProps;

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
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
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
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
    margin-bottom: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
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
  () => import('../../components/shared/flatsDisplay/flatsDisplay'),
  {
    ssr: false,
    loading: () => <FlatsDisplayPlaceholder />,
  }
);

const FlatDetailPage = ({ flat, recommendedFlats }: Props): JSX.Element => {
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const deserializedRecommendedFlats = deserializeMultiple(
    recommendedFlats,
    IFlat
  );
  const deserializedFlat = deserializeSingle(flat, IFlat);

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
      message.success(i18n.t('messages.subscriptionSuccess'));
    } catch (error) {
      message.error(i18n.t('messages.subscriptionError'));
    }
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {i18n.t('flatDetail.title', {
            type: i18n.t(`flatTypes.${deserializedFlat.type}`),
            city: deserializedFlat.city,
            sqrMeters: deserializedFlat.sqrMeters,
            rooms: deserializedFlat.rooms,
            bathrooms: deserializedFlat.bathrooms,
            price: deserializedFlat.price,
            address: deserializedFlat.address,
          })}
        </title>
        <meta
          name="description"
          content={i18n.t('flatDetail.description', {
            type: deserializedFlat.type,
            address: deserializedFlat.address,
            city: deserializedFlat.city,
            sqrMeters: deserializedFlat.sqrMeters,
            rooms: deserializedFlat.rooms,
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
          <Row gutter={[80, 48]}>
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
          </Row>
        </DescriptionSection>
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={deserializedRecommendedFlats}
            title={i18n.t('flatDetail.messages.recommendedFlats')}
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
    }
  };
};

export default FlatDetailPage;
