import { Fragment } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import useI18n from '../../common/hooks/useI18n';

const Title = styled.h2`
  ${(props) => props.theme.font.h2}

  color: ${(props) => props.theme.colors.secondary};
`;

const Divider = styled.div`
  width: 50%;
  @media ${(props) => props.theme.breakpoints.smd} {
    width: 100%;
  }
  margin-top: 8px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Property = styled.div`
  text-align: center;
`;

const ImageContainer = styled.div`
  height: 120px;
  @media ${(props) => props.theme.breakpoints.smd} {
    height: 80px;
  }
`;

const ImageFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;

const PropertyTitle = styled.div`
  font-size: 20px;
  margin-top: 24px;
`;

const PropertyDescription = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 24px;
`;

const WhySellWithUs = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Fragment>
      <Title>{i18n.t('sellHouse.why.title')}</Title>
      <Divider />
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Property>
            <ImageContainer>
              <ImageFlexContainer>
                <Image
                  src="/images/sell_house_professional.png"
                  alt={i18n.t('sellHouse.why.properties.professional.title')}
                />
              </ImageFlexContainer>
            </ImageContainer>
            <PropertyTitle>
              {i18n.t('sellHouse.why.properties.professional.title')}
            </PropertyTitle>
            <PropertyDescription>
              {i18n.t('sellHouse.why.properties.professional.description')}
            </PropertyDescription>
          </Property>
        </Col>
        <Col xs={24} md={8}>
          <Property>
            <ImageContainer>
              <ImageFlexContainer>
                <Image
                  src="/images/sell_house_fast.png"
                  alt={i18n.t('sellHouse.why.properties.fast.title')}
                />
              </ImageFlexContainer>
            </ImageContainer>
            <PropertyTitle>
              {i18n.t('sellHouse.why.properties.fast.title')}
            </PropertyTitle>
            <PropertyDescription>
              {i18n.t('sellHouse.why.properties.fast.description')}
            </PropertyDescription>
          </Property>
        </Col>
        <Col xs={24} md={8}>
          <Property>
            <ImageContainer>
              <ImageFlexContainer>
                <Image
                  src="/images/sell_house_experience.png"
                  alt={i18n.t('sellHouse.why.properties.experience.title')}
                />
              </ImageFlexContainer>
            </ImageContainer>
            <PropertyTitle>
              {i18n.t('sellHouse.why.properties.experience.title')}
            </PropertyTitle>
            <PropertyDescription>
              {i18n.t('sellHouse.why.properties.experience.description')}
            </PropertyDescription>
          </Property>
        </Col>
      </Row>
    </Fragment>
  );
};

export default WhySellWithUs;