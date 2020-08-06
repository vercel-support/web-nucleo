import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Row, Col, Form, Input, Modal } from 'antd';

import nextI18Next from '../../i18n';

const { withTranslation } = nextI18Next;

type Props = {
  isSellerMode: boolean;
  visible: boolean;
  onOk: (
    name: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  ) => void;
  onCancel: () => void;
} & WithTranslation;

const InputContainer = styled.div`
  color: ${(props) => props.theme.colors.secondary};

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};

  margin-left: 8px;
  margin-right: 8px;

  & input {
    border-radius: 35px;
  }
`;

const StyledModal = styled(Modal)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};

  & .ant-modal-footer {
    padding-bottom: 14px;
    padding-top: 14px;
  }
`;

const ModalForm = ({
  t,
  isSellerMode,
  visible,
  onOk,
  onCancel,
}: Props): JSX.Element => {
  const [form] = Form.useForm();
  const validateMessages = {
    required: t('modalForm.validateRequired'),
    types: {
      email: t('modalForm.validateEmail'),
    },
  };
  return (
    <StyledModal
      title={isSellerMode ? t('modalForm.titleSell') : t('modalForm.titleBuy')}
      visible={visible}
      centered
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
      okText={t('modalForm.send')}
      cancelText={t('modalForm.cancel')}
    >
      <Form
        validateMessages={validateMessages}
        form={form}
        onFinish={(values) =>
          onOk(
            values.name,
            values.lastName,
            values.email,
            values.phone,
            values.address || null
          )
        }
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <InputContainer>
              <Form.Item
                labelCol={{ span: 24 }}
                name="name"
                label={t('modalForm.name')}
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
                label={t('modalForm.lastName')}
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
                label={t('modalForm.email')}
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
                label={t('modalForm.phone')}
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
                  label={t('modalForm.address')}
                  rules={[{ required: true }]}
                >
                  <Input></Input>
                </Form.Item>
              </InputContainer>
            </Col>
          ) : null}
        </Row>
      </Form>
    </StyledModal>
  );
};

export default withTranslation('common')(ModalForm);
