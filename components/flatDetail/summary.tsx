import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { formatCurrency } from '../../common/helpers';

type Props = {
  flat: IFlat;
  className?: string;
  theme: DefaultTheme;
};

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

const Summary = ({ flat, className, theme }: Props): JSX.Element => {
  const i18n = useI18n();
  const isLgUp = useMediaQuery({ query: theme.breakpoints.lgu });

  return (
    <Row justify={'center'} className={className}>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image
              src="/images/superficie.png"
              alt={i18n.t('flat.sqrMeters')}
            />
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
            <Description>{i18n.t('flat.sqrMeters')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/dormitorios.png" alt={i18n.t('flat.rooms')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.rooms}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{i18n.t('flat.rooms')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/banyos.png" alt={i18n.t('flat.bathrooms')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{flat.bathrooms}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{i18n.t('flat.bathrooms')}</Description>
          </div>
        )}
      </Col>
      <Col xs={6} sm={5} md={4} xl={3} style={{ textAlign: 'center' }}>
        <ImageContainer>
          <ImageFlexContainer>
            <Image src="/images/precio.png" alt={i18n.t('flat.price')} />
          </ImageFlexContainer>
        </ImageContainer>
        <div style={{ marginTop: '1rem' }}>
          <Info>{formatCurrency(flat.price, 'es' /* i18n.language */)}</Info>
        </div>
        {isLgUp && (
          <div style={{ marginTop: '1rem' }}>
            <Description>{i18n.t('flat.price')}</Description>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default withTheme(Summary);
