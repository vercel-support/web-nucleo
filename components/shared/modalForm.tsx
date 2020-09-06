import styled from 'styled-components';
import { Modal, Form } from 'antd';

import { IContact } from '../../common/model/mailchimp/contact.model';
import useI18n from '../../common/hooks/useI18n';
import { ContactForm } from './';

type Props = {
  isSellerMode: boolean;
  visible: boolean;
  onOk: (contact: IContact) => void;
  onCancel: () => void;
};

const StyledModal = styled(Modal)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};

  & .ant-modal-footer {
    padding-bottom: 14px;
    padding-top: 14px;
  }
`;

const ModalForm = ({
  isSellerMode,
  visible,
  onOk,
  onCancel,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const [form] = Form.useForm();

  return (
    <StyledModal
      title={
        isSellerMode
          ? i18n.t('contactForm.titleSell')
          : i18n.t('contactForm.titleBuy')
      }
      visible={visible}
      centered
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
      okText={i18n.t('contactForm.send')}
      cancelText={i18n.t('contactForm.cancel')}
    >
      <ContactForm form={form} onFinish={onOk} showAddress={isSellerMode} />
    </StyledModal>
  );
};

export default ModalForm;
