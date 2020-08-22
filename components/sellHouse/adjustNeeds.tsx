import styled from 'styled-components';
import { Row, Col } from 'antd';

import useI18n from '../../common/hooks/useI18n';

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('sell_house_adjust_needs_background.png')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
`;

const Content = styled.div`
  height: 545px;
  @media ${(props) => props.theme.breakpoints.smd} {
    height: 388px;
  }
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: left;
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
