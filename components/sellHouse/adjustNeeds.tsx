import styled from 'styled-components';
import { Row, Col } from 'antd';

import useI18n from '../../common/hooks/useI18n';

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('sell_house_adjust_needs_background.png')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

const Content = styled.div`
  min-height: 545px;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: left;
  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: 388px;
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

const AdjustNeeds = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <Content>
        <Row justify="start">
          <Col xs={24} md={12}>
            <Title>{i18n.t('sellHouse.adjustNeeds.title')}</Title>
            <Divider />
            <Subtitle>{i18n.t('sellHouse.adjustNeeds.subtitle')}</Subtitle>
            <Description>
              {i18n.t('sellHouse.adjustNeeds.description')}
            </Description>
          </Col>
        </Row>
      </Content>
    </Background>
  );
};

export default AdjustNeeds;
