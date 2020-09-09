import styled from 'styled-components';
import { Row, Col, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import { IContact } from '../../common/model/mailchimp/contact.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  form: FormInstance;
  onFinish: (contact: IContact) => void;
  showAddress?: boolean;
  showSubject?: boolean;
};

const InputContainer = styled.div`
  color: ${(props) => props.theme.colors.secondary};
`;

const ContactForm = ({
  form,
  onFinish,
  showAddress,
  showSubject,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const validateMessages = {
    required: i18n.t('contactForm.validateRequired'),
    types: {
      email: i18n.t('contactForm.validateEmail'),
    },
  };

  return (
    <Form
      validateMessages={validateMessages}
      form={form}
      onFinish={(values) => {
        const contact: IContact = {
          EMAIL: values.email,
          FNAME: values.name,
          LNAME: values.lastName,
        };
        if (values.phone) {
          contact.PHONE = values.phone;
        }
        if (values.address) {
          contact.HADDRESS = values.address;
        }
        if (values.subject) {
          contact.SUBJECT = values.subject;
        }
        onFinish(contact);
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <InputContainer>
            <Form.Item
              labelCol={{ span: 24 }}
              name="name"
              label={i18n.t('contactForm.name')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </InputContainer>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <InputContainer>
            <Form.Item
              labelCol={{ span: 24 }}
              name="lastName"
              label={i18n.t('contactForm.lastName')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </InputContainer>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <InputContainer>
            <Form.Item
              labelCol={{ span: 24 }}
              name="email"
              label={i18n.t('contactForm.email')}
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>
          </InputContainer>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <InputContainer>
            <Form.Item
              labelCol={{ span: 24 }}
              name="phone"
              label={i18n.t('contactForm.phone')}
            >
              <Input />
            </Form.Item>
          </InputContainer>
        </Col>
        {showAddress ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <InputContainer>
              <Form.Item
                labelCol={{ span: 24 }}
                name="address"
                label={i18n.t('contactForm.address')}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </InputContainer>
          </Col>
        ) : null}
        {showSubject ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <InputContainer>
              <Form.Item
                labelCol={{ span: 24 }}
                name="subject"
                label={i18n.t('contactForm.subject')}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </InputContainer>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default ContactForm;
