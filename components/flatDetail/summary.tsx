import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Row, Col } from 'antd';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  className?: string;
} & WithTranslation;

const ImageContainer = styled.div`
  height: 64px;
  @media ${(props) => props.theme.breakpoints.smd} {
    height: 40px;
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
`;

const Info = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const Description = styled.span`
  font-size: 14px;
`;

const Summary = ({ flat, className, i18n, t }: Props): JSX.Element => {
  return (
    <Row justify={'center'} className={className}>
      <Col xs={6} sm={5} md={4} lg={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/superficie.svg" />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>
            {flat.sqrMeters} m<sup>2</sup>
          </Info>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Description>{t('flat.sqrMeters')}</Description>
        </div>
      </Col>
      <Col xs={6} sm={5} md={4} lg={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/dormitorios.svg" />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.rooms}</Info>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Description>{t('flat.rooms')}</Description>
        </div>
      </Col>
      <Col xs={6} sm={5} md={4} lg={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/banyos.svg" />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.rooms}</Info>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Description>{t('flat.bathrooms')}</Description>
        </div>
      </Col>
      <Col xs={6} sm={5} md={4} lg={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/precio.svg" />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>
            {new Intl.NumberFormat(i18n.language, {
              style: 'currency',
              currency: 'EUR',
            })
              .format(flat.price)
              .replace(/\D00(?=\D*$)/, '')}
          </Info>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Description>{t('flat.price')}</Description>
        </div>
      </Col>
    </Row>
  );
};

export default withTranslation('common')(Summary);
