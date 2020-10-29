import Link from 'next/link';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col, Tag, Carousel } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { formatCurrency } from '../../common/helpers';
import * as flatTypeUtils from '../../common/helpers/flatType.utils';

type Props = {
  flat: IFlat;
  cardBackgroundColor?: string;
  forceVerticalMode?: boolean;
  useCarousel?: boolean;
  onMouseEnter?: () => void;
  className?: string;
  theme: DefaultTheme;
};

const StyledAnchor = styled.a`
  color: inherit;
  &:hover {
    color: inherit;
  }

  .ant-carousel {
    line-height: 0;
    height: 100%;

    & > .slick-slider {
      height: 100%;

      & > .slick-list {
        height: 100%;

        & > .slick-track {
          height: 100%;

          & > .slick-slide {
            height: 100%;

            & > div {
              height: 100%;

              & > div {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
`;

const Image = styled.div<{ imageUrl: string; forceVerticalMode: boolean }>`
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
  height: ${(props) => (props.forceVerticalMode ? '24vh' : '100%')};
  min-height: ${(props) => (props.forceVerticalMode ? '200px' : 'unset')};
  max-height: ${(props) => (props.forceVerticalMode ? '300px' : 'unset')};
  @media ${(props) => props.theme.breakpoints.lgu} {
    border-top-right-radius: ${(props) =>
      props.forceVerticalMode ? props.theme.borderRadius : '0'};
    border-bottom-left-radius: ${(props) =>
      props.forceVerticalMode ? '0' : props.theme.borderRadius};
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    height: 24vh;
    min-height: 200px;
    max-height: 300px;
    border-top-right-radius: ${(props) => props.theme.borderRadius};
    border-bottom-left-radius: 0;
  }
`;

const InfoContainer = styled.div<{ cardBackgroundColor: string }>`
  padding: 24px;
  background-color: ${(props) => props.cardBackgroundColor};

  @media ${(props) => props.theme.breakpoints.smd} {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.breakpoints.mdd} {
    font-size: 16px;
  }
`;

const FeaturesSection = styled.div`
  margin-top: 16px;
`;

const FeaturesRow = styled(Row)`
  margin-bottom: -16px !important;
`;

const FeatureAtTopCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureAtBottomCol = styled(Col)<{ forceVerticalMode: boolean }>`
  display: ${(props) => (props.forceVerticalMode ? 'none' : 'block')};
  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }
`;

const FeatureInfo = styled.div`
  font-size: 14px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
  }
`;

const BottomInfoSection = styled.div`
  margin-top: 32px;
`;

const StyledTag = styled(Tag)`
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceText = styled.div`
  float: right;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
  color: ${(props) => props.theme.colors.secondary};
`;

const FlatCard = ({
  flat,
  cardBackgroundColor = 'default',
  forceVerticalMode = false,
  useCarousel = false,
  onMouseEnter,
  className,
  theme,
}: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className} onMouseEnter={onMouseEnter}>
      <Link href={`/pisos/${flat.id}`} passHref>
        <StyledAnchor>
          <Row>
            <Col xs={24} lg={forceVerticalMode ? 24 : 8}>
              {useCarousel ? (
                <Carousel
                  dots={false}
                  draggable={true}
                  lazyLoad={'ondemand'}
                  arrows={true}
                >
                  {flat.pictureUrls.map((url) => (
                    <div key={url}>
                      <Image
                        imageUrl={url}
                        forceVerticalMode={forceVerticalMode}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Image
                  imageUrl={flat.pictureUrls[0]}
                  forceVerticalMode={forceVerticalMode}
                />
              )}
            </Col>
            <Col xs={24} lg={forceVerticalMode ? 24 : 16}>
              <InfoContainer cardBackgroundColor={cardBackgroundColor}>
                <Title>
                  {i18n.t('flat.title', {
                    type: i18n.t(flatTypeUtils.getFlatTypeLabel(flat.type)),
                    address: flat.address,
                  })}
                </Title>
                <FeaturesSection>
                  <FeaturesRow gutter={[16, 32]}>
                    <FeatureAtTopCol span={forceVerticalMode ? 12 : 8}>
                      <FeatureInfo>{`${flat.rooms} ${i18n
                        .t('flat.roomsShort')
                        .toLowerCase()}`}</FeatureInfo>
                    </FeatureAtTopCol>
                    <FeatureAtTopCol span={forceVerticalMode ? 12 : 8}>
                      <FeatureInfo>{`${flat.bathrooms} ${i18n
                        .t('flat.bathrooms')
                        .toLowerCase()}`}</FeatureInfo>
                    </FeatureAtTopCol>
                    <FeatureAtTopCol span={forceVerticalMode ? 0 : 8}>
                      <FeatureInfo>
                        {flat.sqrMeters} m
                        <sup
                          css={`
                            vertical-align: top;
                            font-size: 0.6em;
                          `}
                        >
                          2
                        </sup>
                      </FeatureInfo>
                    </FeatureAtTopCol>
                    <FeatureAtBottomCol
                      span={8}
                      forceVerticalMode={forceVerticalMode}
                    >
                      <FeatureInfo>
                        {`${
                          flat.hasElevator
                            ? i18n.t('messages.with')
                            : i18n.t('messages.without')
                        } ${i18n.t('flat.elevator').toLowerCase()}`}
                      </FeatureInfo>
                    </FeatureAtBottomCol>
                    <FeatureAtBottomCol
                      span={8}
                      forceVerticalMode={forceVerticalMode}
                    >
                      <FeatureInfo>
                        {`${
                          flat.hasTerrace
                            ? i18n.t('messages.with')
                            : i18n.t('messages.without')
                        } ${i18n.t('flat.terrace').toLowerCase()}`}
                      </FeatureInfo>
                    </FeatureAtBottomCol>
                    {flat.yearConstruction ? (
                      <FeatureAtBottomCol
                        span={8}
                        forceVerticalMode={forceVerticalMode}
                      >
                        <FeatureInfo>{`${i18n.t('flat.yearConstruction')} ${
                          flat.yearConstruction
                        }`}</FeatureInfo>
                      </FeatureAtBottomCol>
                    ) : null}
                  </FeaturesRow>
                </FeaturesSection>
                <BottomInfoSection>
                  <Row align={'middle'}>
                    <Col span={14}>
                      <Link
                        href={{
                          pathname: '/buscar',
                          query: {
                            q: `${flat.zone} (${flat.city})`,
                          },
                        }}
                        passHref
                      >
                        <StyledTag color={theme.colors.secondary}>
                          {`${flat.zone} (${flat.city})`}
                        </StyledTag>
                      </Link>
                    </Col>
                    <Col span={10}>
                      <PriceText>
                        {formatCurrency(flat.price, i18n.activeLocale)}
                      </PriceText>
                    </Col>
                  </Row>
                </BottomInfoSection>
              </InfoContainer>
            </Col>
          </Row>
        </StyledAnchor>
      </Link>
    </div>
  );
};

export default withTheme(styled(FlatCard)`
  background-color: white;
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
  overflow: hidden;
`);
