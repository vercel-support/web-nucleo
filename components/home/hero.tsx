import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';
import { Button } from 'antd';
import { useState } from 'react';
import { ModalForm } from '../shared';
import { useRouter } from 'next/router';

const { withTranslation } = nextI18Next;

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('banner_hero.png')};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 55vh;
  min-height: 500px;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
  width: 100%;
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
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: var(--gutter);
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const Subtitle = styled.h1`
  font-weight: bold;
  font-size: 24px;

  max-width: ${(props) => props.theme.grid.getGridColumns(7, 0)};

  @media ${(props) => props.theme.breakpoints.xl} {
    max-width: ${(props) => props.theme.grid.getGridColumns(9, 0)};
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}
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

  @media ${(props) => props.theme.breakpoints.xs} {
    width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: ${(props) => props.theme.grid.getGridColumns(16, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(13, 0)};
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    width: ${(props) => props.theme.grid.getGridColumns(13, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    width: ${(props) => props.theme.grid.getGridColumns(11, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xxl} {
    width: ${(props) => props.theme.grid.getGridColumns(10, 0)};
  }
`;

const ActionButton = styled(Button)<{ side: string }>`
  width: 50%;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;

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

  @media ${(props) => props.theme.breakpoints.xs} {
    height: 47px;
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    height: 60px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    height: 65px;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    height: 68px;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    height: 70px;
  }
  @media ${(props) => props.theme.breakpoints.xxl} {
    height: 70px;
  }
`;

type Props = WithTranslation;

const Hero = ({ t }: Props): JSX.Element => {
  const [isModalSellerMode, setModalSellerMode] = useState(false);
  const router = useRouter();

  const modalVisible: boolean =
    'displayModal' in router.query && router.query['displayModal'] == 'true';

  function setModalVisible(toVisible: boolean): void {
    if (process.browser == true) {
      if (toVisible == true && !modalVisible) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, displayModal: true },
        });
      } else if (toVisible == false && modalVisible) {
        const query = Object.assign({}, router.query, {
          displayModal: undefined,
        });
        delete query['displayModal'];
        router.push({
          pathname: router.pathname,
          query: query,
        });
      }
    }
  }

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
            setModalSellerMode(false);
            setModalVisible(true);
            (a.target as HTMLButtonElement).blur();
          }}
        >
          {t('comprar')}
        </ActionButton>
        <ActionButton
          side="right"
          onClick={(a) => {
            setModalSellerMode(true);
            setModalVisible(true);
            (a.target as HTMLButtonElement).blur();
          }}
        >
          {t('vender')}
        </ActionButton>
        <ModalForm
          isSellerMode={isModalSellerMode}
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </ActionButtons>
    </Background>
  );
};
export default withTranslation('common')(Hero);
