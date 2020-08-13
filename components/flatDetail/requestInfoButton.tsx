import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import useI18n from '../../common/hooks/useI18n';
import { ModalForm } from '../shared';

type Props = {
  onBuyButtonClicked: (
    name: string,
    lastName: string,
    email: string,
    phone: string
  ) => void;
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
        onClick={(e) => {
          (e.target as HTMLButtonElement).blur();
          setModalVisible(true);
        }}
      >
        {i18n.t('flatDetail.actions.requestInfo')}
      </Button>
      <ModalForm
        isSellerMode={false}
        visible={isModalVisible}
        onOk={(name, lastName, email, phone) => {
          onBuyButtonClicked(name, lastName, email, phone);
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
  height: 56px;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
`;
