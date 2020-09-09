import styled from 'styled-components';
import { Row, Col, Form, Button } from 'antd';

import { IContact } from '../../common/model/mailchimp/contact.model';
import useI18n from '../../common/hooks/useI18n';
import { ContactForm } from '../../components/shared';

type Props = {
  onSendButtonClicked: (contact: IContact) => void;
};

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('sell_house_hero.png')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const Card = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  padding: 64px;
  @media ${(props) => props.theme.breakpoints.mdd} {
    padding: 40px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 32px;
  }
`;

const CardRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const Title = styled.h1`
  ${(props) => props.theme.font.h1}
  color: ${(props) => props.theme.colors.secondary};
  font-size: 38px !important;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px !important;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 26px !important;
  }
`;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};

  width: 64px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  @media ${(props) => props.theme.breakpoints.smd} {
    font-size: 14px;
  }
  font-weight: 500;
  line-height: 22px;
`;

const SellHouseForm = ({ onSendButtonClicked }: Props): JSX.Element => {
  const i18n = useI18n();
  const [form] = Form.useForm();

  return (
    <Background>
      <Card>
        <CardRow gutter={[24, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title>{i18n.t('sellHouse.form.title')}</Title>
            <Divider />
            <Subtitle>{i18n.t('sellHouse.form.subtitle')}</Subtitle>
            <Subtitle style={{ marginTop: '16px' }}>
              {i18n.t('sellHouse.form.subtitle2')}
            </Subtitle>
          </Col>
          <Col xs={24} md={12}>
            <ContactForm
              form={form}
              onFinish={onSendButtonClicked}
              showAddress={true}
            />
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => form.submit()}
                >
                  {i18n.t('sellHouse.form.send')}
                </Button>
              </Col>
            </Row>
          </Col>
        </CardRow>
      </Card>
    </Background>
  );
};

export default SellHouseForm;
