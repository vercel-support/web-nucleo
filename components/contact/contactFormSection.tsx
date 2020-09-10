import styled from 'styled-components';
import { Row, Col, Form, Button } from 'antd';

import { IContact } from '../../common/model/mailchimp/contact.model';
import useI18n from '../../common/hooks/useI18n';
import { ContactForm } from '../../components/shared';

type Props = {
  onSendButtonClicked: (contact: IContact) => void;
};

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vw * 0.3709);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  @media ${(props) => props.theme.breakpoints.xxl} {
    background-image: linear-gradient(
        180deg,
        rgba(245, 245, 245, 0) 28.13%,
        #f5f5f5 100%
      ),
      url('/images/contact_hero.jpg');
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    background-image: linear-gradient(
        180.16deg,
        rgba(245, 245, 245, 0) 19.03%,
        #f5f5f5 99.86%
      ),
      url('/images/contact_hero.jpg');
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    background-image: linear-gradient(
        180deg,
        rgba(245, 245, 245, 0) 8.85%,
        #f5f5f5 100%
      ),
      url('/images/contact_hero.jpg');
  }
  @media ${(props) => props.theme.breakpoints.md} {
    background-image: linear-gradient(
        180deg,
        rgba(245, 245, 245, 0) 4.69%,
        #f5f5f5 100%
      ),
      url('/images/contact_hero.jpg');
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    background-image: linear-gradient(
        180deg,
        rgba(245, 245, 245, 0) 18.23%,
        #f5f5f5 100%
      ),
      url('/images/contact_hero.jpg');
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    background-image: linear-gradient(
        180deg,
        rgba(245, 245, 245, 0) 10.94%,
        #f5f5f5 100%
      ),
      url('/images/contact_hero.jpg');
  }
`;

const Card = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  margin-top: calc(100vw * 0.3709 * 0.5);
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
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

const ContactFormSection = ({ onSendButtonClicked }: Props): JSX.Element => {
  const i18n = useI18n();
  const [form] = Form.useForm();

  return (
    <div>
      <Image />
      <Card>
        <CardRow gutter={[24, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title>{i18n.t('contact.form.title')}</Title>
            <Divider />
            <Subtitle>{i18n.t('contact.form.subtitle')}</Subtitle>
            <Subtitle style={{ marginTop: '16px' }}>
              {i18n.t('contact.form.subtitle2')}
            </Subtitle>
          </Col>
          <Col xs={24} md={12}>
            <ContactForm
              form={form}
              onFinish={onSendButtonClicked}
              showSubject={true}
            />
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => form.submit()}
                >
                  {i18n.t('contact.form.send')}
                </Button>
              </Col>
            </Row>
          </Col>
        </CardRow>
      </Card>
    </div>
  );
};

export default ContactFormSection;
