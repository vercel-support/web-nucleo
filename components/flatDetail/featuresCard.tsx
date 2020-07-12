import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Row, Col, Space } from 'antd';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  className?: string;
} & WithTranslation;

const FeatureTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

const FeatureInfo = styled.div`
  margin-top: 1rem;
  font-size: 14px;
`;

const FeaturesCard = ({ flat, className, t }: Props): JSX.Element => {
  return (
    <Space
      direction={'vertical'}
      size={'large'}
      className={className}
      style={{ width: '100%' }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <FeatureTitle>{t('flat.rooms')}</FeatureTitle>
          <FeatureInfo>{flat.rooms}</FeatureInfo>
        </Col>
        <Col span={12}>
          <FeatureTitle>{t('flat.bathrooms')}</FeatureTitle>
          <FeatureInfo>{flat.rooms}</FeatureInfo>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FeatureTitle>{t('calefaccion')}</FeatureTitle>
          <FeatureInfo>{t('yes')}</FeatureInfo>
        </Col>
        <Col span={12}>
          <FeatureTitle>{t('aireAcondicionado')}</FeatureTitle>
          <FeatureInfo>{t('yes')}</FeatureInfo>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FeatureTitle>{t('terraza')}</FeatureTitle>
          <FeatureInfo>{t('yes')}</FeatureInfo>
        </Col>
        <Col span={12}>
          <FeatureTitle>{t('orientacion')}</FeatureTitle>
          <FeatureInfo>{t('yes')}</FeatureInfo>
        </Col>
      </Row>
    </Space>
  );
};

export default styled(withTranslation('common')(FeaturesCard))`
  border: 1px solid #f2f2f2;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 2rem;
`;
