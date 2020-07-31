import Link from 'next/link';
import styled from 'styled-components';
import LanguageSelector from './languageSelector';
import { Button } from 'antd';
import i18Next from '../../i18n';
import { WithTranslation, TFunction } from 'next-i18next';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { withTranslation } = i18Next;

type Props = {
  className?: string;
} & WithTranslation;

const MenuButtons = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  color: ${(props) => props.theme.colors.secondary};
`;

const StyledButton = styled(Button)`
  opacity: 0.55;
  color: ${(props) => props.theme.colors.secondary};

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const NucleoLabel = styled.p`
  padding: 4px 15px;
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const DropdownMenu = (t: TFunction) => (
  <Menu>
    <Menu.Item key="0">
      <StyledButton type="text">{t('aviso-legal')}</StyledButton>
    </Menu.Item>
    <Menu.Item key="1">
      <StyledButton type="text">{t('politica-datos')}</StyledButton>
    </Menu.Item>
    <Menu.Item key="2">
      <Link href="/legal/cookies">
        <StyledButton type="text">{t('politica-cookies')}</StyledButton>
      </Link>
    </Menu.Item>
  </Menu>
);

const Footer = ({ className, t }: Props) => {
  return (
    <footer className={className}>
      <MenuButtons>
        <LanguageSelector themeColor="secondary" />
      </MenuButtons>
      <div
        css={`
          @media ${(props) => props.theme.breakpoints.xlu} {
            display: none;
          }
        `}
      >
        <Dropdown overlay={DropdownMenu(t)} trigger={['click']}>
          <NucleoLabel>
            {t('nucleo-sl')} <DownOutlined />
          </NucleoLabel>
        </Dropdown>
      </div>
      <MenuButtons
        css={`
          @media ${(props) => props.theme.breakpoints.lgd} {
            display: none;
          }
        `}
      >
        <NucleoLabel>{t('nucleo-sl')}</NucleoLabel>
        <StyledButton type="text">{t('aviso-legal')}</StyledButton>
        <StyledButton type="text">{t('politica-datos')}</StyledButton>
        <Link href="/legal/cookies">
          <StyledButton type="text">{t('politica-cookies')}</StyledButton>
        </Link>
      </MenuButtons>
    </footer>
  );
};

export default styled(withTranslation('common')(Footer))`
  width: 100%;
  height: ${(props) => props.theme.footerHeight};

  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;
