import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col, Tag } from 'antd';

import { IFlat } from '../../../common/model/flat.model';
import useI18n from '../../../common/hooks/useI18n';
import { formatCurrency } from '../../../common/helpers';

type Props = {
  flat: IFlat;
  theme: DefaultTheme;
  className?: string;
};

const ImageCol = styled(Col)<{ imageUrl: string }>`
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
`;

const FeaturesCardRow = styled(Row)`
  margin-bottom: -16px !important;
`;

const FeatureAtTopCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureTitle = styled.div`
  font-size: 14px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
  }
  font-weight: 600;
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
`;

const PriceText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
  color: ${(props) => props.theme.colors.secondary};
`;

const ResultCard = ({ flat, theme, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Row>
        <ImageCol span={8} imageUrl={flat.pictureUrls[0]} />
        <Col span={16}>
          <div style={{ padding: '24px' }}>
            <FeaturesCardRow gutter={[16, 32]}>
              <FeatureAtTopCol span={8}>
                <FeatureTitle>{i18n.t('flat.rooms')}</FeatureTitle>
                <FeatureInfo>{flat.rooms}</FeatureInfo>
              </FeatureAtTopCol>
              <FeatureAtTopCol span={8}>
                <FeatureTitle>{i18n.t('flat.bathrooms')}</FeatureTitle>
                <FeatureInfo>{flat.bathrooms}</FeatureInfo>
              </FeatureAtTopCol>
              <FeatureAtTopCol span={8}>
                <FeatureTitle>{i18n.t('ascensor')}</FeatureTitle>
                <FeatureInfo>
                  {flat.hasElevator ? i18n.t('yes') : i18n.t('no')}
                </FeatureInfo>
              </FeatureAtTopCol>
              <Col span={8}>
                <FeatureTitle>{i18n.t('jardin')}</FeatureTitle>
                <FeatureInfo>
                  {flat.hasGarden ? i18n.t('yes') : i18n.t('no')}
                </FeatureInfo>
              </Col>
              <Col span={8}>
                <FeatureTitle>{i18n.t('terraza')}</FeatureTitle>
                <FeatureInfo>
                  {flat.hasTerrace ? i18n.t('yes') : i18n.t('no')}
                </FeatureInfo>
              </Col>
              {flat.yearConstruction ? (
                <Col span={8}>
                  <FeatureTitle>{i18n.t('anio_construccion')}</FeatureTitle>
                  <FeatureInfo>{flat.yearConstruction}</FeatureInfo>
                </Col>
              ) : null}
            </FeaturesCardRow>
            <BottomInfoSection>
              <Row align={'middle'} justify={'space-between'}>
                <Col>
                  <StyledTag color={theme.colors.secondary}>
                    {flat.zone}
                  </StyledTag>
                </Col>
                <Col>
                  <PriceText>
                    {formatCurrency(flat.price, i18n.activeLocale)}
                  </PriceText>
                </Col>
              </Row>
            </BottomInfoSection>
          </div>
        </Col>
      </Row>
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
