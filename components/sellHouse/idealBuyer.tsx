import styled from 'styled-components';
import { Row, Col } from 'antd';

import useI18n from '../../common/hooks/useI18n';

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('sell_house_ideal_buyer_background.png')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center left;
  @media ${(props) => props.theme.breakpoints.smd} {
    background-size: cover;
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

const Content = styled.div`
  min-height: calc((((100vw / 4) - 32px) * 3) * 0.6622);
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: right;
  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: unset;
    text-align: left;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: #ffffff;
    opacity: 0.9;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }
`;

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
`;

const Divider = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 22px;
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 24px;
`;

const IdealBuyer = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <Content>
        <Row justify="end">
          <Col xs={24} md={12} xxl={8}>
            <Title>{i18n.t('sellHouse.idealBuyer.title')}</Title>
            <Divider />
            <Subtitle>{i18n.t('sellHouse.idealBuyer.subtitle')}</Subtitle>
            <Description>
              {i18n.t('sellHouse.idealBuyer.description')}
            </Description>
          </Col>
        </Row>
      </Content>
    </Background>
  );
};

export default IdealBuyer;