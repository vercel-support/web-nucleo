import styled from 'styled-components';
import { Row, Col, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  form: FormInstance;
  isSellerMode: boolean;
  onFinish: (
    name: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  ) => void;
};

const InputContainer = styled.div`
  color: ${(props) => props.theme.colors.secondary};
`;

const ModalForm = ({ form, isSellerMode, onFinish }: Props): JSX.Element => {
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
      onFinish={(values) =>
        onFinish(
          values.name,
          values.lastName,
          values.email,
          values.phone,
          values.address || null
        )
      }
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
              <Input></Input>
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
              <Input></Input>
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
              <Input></Input>
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
              <Input></Input>
            </Form.Item>
          </InputContainer>
        </Col>
        {isSellerMode ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <InputContainer>
              <Form.Item
                labelCol={{ span: 24 }}
                name="address"
                label={i18n.t('contactForm.address')}
                rules={[{ required: true }]}
              >
                <Input></Input>
              </Form.Item>
            </InputContainer>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default ModalForm;
