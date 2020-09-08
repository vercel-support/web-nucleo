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

const RoomsCol = styled(Col)`
  border-bottom: 1px solid #f2f2f2;
`;

const BathroomsCol = styled(Col)`
  border-bottom: 1px solid #f2f2f2;
`;

const ElevatorCol = styled(Col)`
  border-bottom: 1px solid #f2f2f2;
`;

const GardenCol = styled(Col)`
  border-bottom: 1px solid #f2f2f2;
  @media ${(props) => props.theme.breakpoints.sm} {
    border-bottom-width: 0;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    border-bottom-width: 0;
  }
`;

const TerraceCol = styled(Col)`
  border-bottom-width: 0;
`;

const YearConstructionCol = styled(Col)`
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
        <RoomsCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('flat.rooms')}</FeatureTitle>
          <FeatureInfo>{flat.rooms}</FeatureInfo>
        </RoomsCol>
        <BathroomsCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('flat.bathrooms')}</FeatureTitle>
          <FeatureInfo>{flat.bathrooms}</FeatureInfo>
        </BathroomsCol>
        <ElevatorCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('ascensor')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasElevator ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </ElevatorCol>
        <GardenCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('jardin')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasGarden ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </GardenCol>
        <TerraceCol xs={12} sm={8} lg={12}>
          <FeatureTitle>{i18n.t('terraza')}</FeatureTitle>
          <FeatureInfo>
            {flat.hasTerrace ? i18n.t('yes') : i18n.t('no')}
          </FeatureInfo>
        </TerraceCol>
        {flat.yearConstruction !== undefined ? (
          <YearConstructionCol xs={12} sm={8} lg={12}>
            <FeatureTitle>{i18n.t('anio_construccion')}</FeatureTitle>
            <FeatureInfo>{flat.yearConstruction}</FeatureInfo>
          </YearConstructionCol>
        ) : null}
      </FeaturesCardRow>
    </div>
  );
};

export default styled(FeaturesCard)`
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 2rem;
`;
