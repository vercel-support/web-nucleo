import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { IContact } from '../../common/model/mailchimp/contact.model';
import useI18n from '../../common/hooks/useI18n';
import { ModalForm } from '../shared';

type Props = {
  onBuyButtonClicked: (contact: IContact) => void;
  className?: string;
};

const RequestInfoButton = ({
  onBuyButtonClicked,
  className,
}: Props): JSX.Element => {
  const i18n = useI18n();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <Button
        className={className}
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        {i18n.t('flatDetail.actions.requestInfo')}
      </Button>
      <ModalForm
        isSellerMode={false}
        visible={isModalVisible}
        onOk={(contact) => {
          onBuyButtonClicked(contact);
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </Fragment>
  );
};

export default styled(RequestInfoButton)`
  width: 100%;
  font-weight: 500;
  border-radius: 20px;
`;
