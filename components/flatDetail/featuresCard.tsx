import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  flat: IFlat;
  className?: string;
};

const FeaturesCardRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const FeatureOneCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureTwoCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureThreeCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const FeatureFourCol = styled(Col)`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  @media ${(props) => props.theme.breakpoints.sm} {
    border-bottom-width: 0;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    border-bottom-width: 0;
  }
`;

const FeatureFiveCol = styled(Col)`
  border-bottom-width: 0;
`;

const FeatureSixCol = styled(Col)`
  border-bottom-width: 0;
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

const FeaturesCard = ({ flat, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <FeaturesCardRow gutter={[16, 32]}>
        <FeatureOneCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('flat.rooms')}</FeatureTitle>
          <FeatureInfo>{flat.rooms}</FeatureInfo>
        </FeatureOneCol>
        <FeatureTwoCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('flat.bathrooms')}</FeatureTitle>
          <FeatureInfo>{flat.bathrooms}</FeatureInfo>
        </FeatureTwoCol>
        <FeatureThreeCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('ascensor')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasElevator ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </FeatureThreeCol>
        <FeatureFourCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('jardin')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasGarden ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </FeatureFourCol>
        <FeatureFiveCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('terraza')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasTerrace ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </FeatureFiveCol>
        {flat.yearConstruction ? (
          <FeatureSixCol xs={12} sm={8} lg={12}>
            <FeatureTitle>{i18n.t('anio_construccion')}</FeatureTitle>
            <FeatureInfo>{flat.yearConstruction}</FeatureInfo>
          </FeatureSixCol>
        ) : null}
      </FeaturesCardRow>
    </div>
  );
};

export default styled(FeaturesCard)`
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  padding: 2rem;
`;
