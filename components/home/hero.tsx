import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';
import { Button, Modal } from 'antd';
import { useState } from 'react';

const { withTranslation } = nextI18Next;

const Background = styled.div`
  background-image: url(/images/HeroHome.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 55vh;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  margin-left: 10%;
  margin-top: 50px;
  margin-bottom: 8px;
`;

const TitleParagraph = styled.p<{ themeColor: string }>`
  margin-top: 0;
  margin-bottom: 0;
  letter-spacing: 0em;
  color: ${(props) => props.theme.colors[props.themeColor]};

  ${(props) => props.theme.font.h1}
`;

const Divider = styled.hr`
  width: 86px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 0;
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};

  @media ${(props) => props.theme.breakpoints.smd} {
    display: none;
  }
`;

const Subtitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  max-width: 60%;

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}

  @media ${(props) => props.theme.breakpoints.smd} {
    display: none;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  margin: auto auto;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 99;
  display: flex;
  justify-content: center;

  -ms-transform: translateY(50%);
  transform: translateY(50%);
`;

const ActionButton = styled(Button)<{ side: string }>`
  width: 275px;
  height: 8vh;
  max-height: 76px;
  min-height: 38px;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;

  color: white;
  background-color: ${(props) =>
    props.side == 'right'
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  border-color: ${(props) =>
    props.side == 'right'
      ? props.theme.colors.primary
      : props.theme.colors.secondary};

  border-top-left-radius: ${(props) => (props.side == 'left' ? '40px' : 0)};
  border-top-right-radius: ${(props) => (props.side == 'left' ? 0 : '40px')};
  border-bottom-right-radius: ${(props) => (props.side == 'left' ? 0 : '40px')};
  border-bottom-left-radius: ${(props) => (props.side == 'left' ? '40px' : 0)};
`;

type Props = WithTranslation;

const Hero = ({ t }: Props): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Background>
      <Title>
        <TitleParagraph themeColor="secondary">
          {t('hero-title-1')}
        </TitleParagraph>
        <TitleParagraph themeColor="primary">
          {t('hero-title-2')}
        </TitleParagraph>
        <Divider />
        <Subtitle>{t('hero-subtitle')}</Subtitle>
      </Title>
      <ActionButtons>
        <ActionButton
          side="left"
          onClick={(a) => {
            setModalVisible(true);
            (a.target as HTMLButtonElement).blur();
          }}
        >
          {t('comprar')}
        </ActionButton>
        <ActionButton
          side="right"
          onClick={(a) => {
            setModalVisible(true);
            (a.target as HTMLButtonElement).blur();
          }}
        >
          {t('vender')}
        </ActionButton>
        <Modal
          title="Basic Modal"
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </ActionButtons>
    </Background>
  );
};
export default withTranslation('common')(Hero);
