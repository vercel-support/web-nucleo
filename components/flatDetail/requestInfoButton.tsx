import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Button } from 'antd';

import nextI18Next from '../../i18n';
import { ModalForm } from '../shared';

const { withTranslation } = nextI18Next;

type Props = {
  onBuyButtonClicked: (
    name: string,
    lastName: string,
    email: string,
    phone: string
  ) => void;
  className?: string;
} & WithTranslation;

const RequestInfoButton = ({
  onBuyButtonClicked,
  className,
  t,
}: Props): JSX.Element => {
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
        {t('flatDetail.actions.requestInfo')}
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

export default styled(withTranslation('common')(RequestInfoButton))`
  height: 56px;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
`;
