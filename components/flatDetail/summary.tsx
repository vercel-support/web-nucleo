import styled, { withTheme, DefaultTheme } from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';
import { formatCurrency } from '../../common/helpers';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  className?: string;
  theme: DefaultTheme;
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
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
  }
`;

const Summary = ({ flat, className, theme, i18n, t }: Props): JSX.Element => {
  const isLgUp = useMediaQuery({ query: theme.breakpoints.lgu });

  return (
    <Row justify={'center'} className={className}>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/superficie.svg" alt={t('flat.sqrMeters')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>
            {flat.sqrMeters} m
            <sup
              css={`
                vertical-align: top;
                font-size: 0.6em;
              `}
            >
              2
            </sup>
          </Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{t('flat.sqrMeters')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/dormitorios.svg" alt={t('flat.rooms')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.rooms}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{t('flat.rooms')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/banyos.svg" alt={t('flat.bathrooms')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.rooms}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{t('flat.bathrooms')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/precio.svg" alt={t('flat.price')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{formatCurrency(flat.price, i18n.language)}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{t('flat.price')}</Description>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default withTheme(withTranslation('common')(Summary));
