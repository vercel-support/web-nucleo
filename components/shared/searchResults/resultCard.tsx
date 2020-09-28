import Link from 'next/link';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col, Tag } from 'antd';

import { IFlat } from '../../../common/model/flat.model';
import useI18n from '../../../common/hooks/useI18n';
import { formatCurrency } from '../../../common/helpers';
import * as flatTypeUtils from '../../../common/helpers/flatType.utils';

type Props = {
  flat: IFlat;
  theme: DefaultTheme;
  className?: string;
};

const StyledAnchor = styled.a`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const ImageCol = styled(Col)<{ imageUrl: string }>`
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
  @media ${(props) => props.theme.breakpoints.lgu} {
    border-top-right-radius: 0;
    border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    height: 24vh;
    min-height: 220px;
    max-height: 300px;
    border-top-right-radius: ${(props) => props.theme.borderRadius};
    border-bottom-left-radius: 0;
  }
`;

const InfoContainer = styled.div`
  padding: 24px;
  @media ${(props) => props.theme.breakpoints.smd} {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.breakpoints.mdd} {
    font-size: 16px;
  }
`;

const FeaturesCardRow = styled(Row)`
  margin-bottom: -16px !important;
`;

const FeatureAtTopCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureAtBottomCol = styled(Col)`
  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }
`;

const FeatureInfo = styled.div`
  margin-top: 1rem;
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

const ResultCard = ({ flat, theme, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Link key={flat.id} href={`/pisos/${flat.id}`} passHref>
        <StyledAnchor>
          <Row>
            <ImageCol xs={24} lg={8} imageUrl={flat.pictureUrls[0]} />
            <Col xs={24} lg={16}>
              <InfoContainer>
                <Title>
                  {i18n.t('flat.title', {
                    type: i18n.t(flatTypeUtils.getFlatTypeLabel(flat.type)),
                    address: flat.address,
                  })}
                </Title>
                <FeaturesCardRow
                  gutter={[
                    16,
                    { xs: 32, sm: 24, md: 24, lg: 32, xl: 32, xxl: 32 },
                  ]}
                >
                  <FeatureAtTopCol span={8}>
                    <FeatureInfo>{`${flat.rooms} ${i18n
                      .t('flat.roomsShort')
                      .toLowerCase()}`}</FeatureInfo>
                  </FeatureAtTopCol>
                  <FeatureAtTopCol span={8}>
                    <FeatureInfo>{`${flat.bathrooms} ${i18n
                      .t('flat.bathrooms')
                      .toLowerCase()}`}</FeatureInfo>
                  </FeatureAtTopCol>
                  <FeatureAtTopCol span={8}>
                    <FeatureInfo>
                      {`${
                        flat.hasElevator
                          ? i18n.t('messages.with')
                          : i18n.t('messages.without')
                      } ${i18n.t('flat.elevator').toLowerCase()}`}
                    </FeatureInfo>
                  </FeatureAtTopCol>
                  <FeatureAtBottomCol span={8}>
                    <FeatureInfo>
                      {`${
                        flat.hasGarden
                          ? i18n.t('messages.with')
                          : i18n.t('messages.without')
                      } ${i18n.t('flat.garden').toLowerCase()}`}
                    </FeatureInfo>
                  </FeatureAtBottomCol>
                  <FeatureAtBottomCol span={8}>
                    <FeatureInfo>
                      {`${
                        flat.hasTerrace
                          ? i18n.t('messages.with')
                          : i18n.t('messages.without')
                      } ${i18n.t('flat.terrace').toLowerCase()}`}
                    </FeatureInfo>
                  </FeatureAtBottomCol>
                  {flat.yearConstruction ? (
                    <FeatureAtBottomCol span={8}>
                      <FeatureInfo>{`${i18n.t('flat.yearConstruction')} ${
                        flat.yearConstruction
                      }`}</FeatureInfo>
                    </FeatureAtBottomCol>
                  ) : null}
                </FeaturesCardRow>
                <BottomInfoSection>
                  <Row align={'middle'}>
                    <Col span={14}>
                      <StyledTag color={theme.colors.secondary}>
                        {`${flat.zone} (${flat.city})`}
                      </StyledTag>
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

export default withTheme(styled(ResultCard)`
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 32px;
`);
