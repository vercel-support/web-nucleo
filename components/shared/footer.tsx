import Link from 'next/link';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import useI18n from '../../common/hooks/useI18n';
import LanguageSelector from './languageSelector';

type Props = {
  className?: string;
};

const DropdownContainer = styled.div`
  @media ${(props) => props.theme.breakpoints.xlu} {
    display: none;
  }
`;

const MenuButtons = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  color: ${(props) => props.theme.colors.secondary};

  @media ${(props) => props.theme.breakpoints.lgd} {
    display: none;
  }
`;

const StyledMenu = styled(Menu)`
  border-radius: 0;
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const StyledButton = styled(Button)`
  color: ${(props) => props.theme.colors.secondary};

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const NucleoLabel = styled.p`
  padding: 4px 15px;
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`;

const Footer = ({ className }: Props) => {
  const i18n = useI18n();

  const dropdownMenu = (
    <StyledMenu>
      <Menu.Item key="0">
        <StyledLink>{i18n.t('aviso-legal')}</StyledLink>
      </Menu.Item>
      <Menu.Item key="1">
        <StyledLink>{i18n.t('politica-datos')}</StyledLink>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/legal/cookies" passHref>
          <StyledLink>{i18n.t('politica-cookies')}</StyledLink>
        </Link>
      </Menu.Item>
    </StyledMenu>
  );

  return (
    <footer className={className}>
      <MenuButtons>
        <LanguageSelector />
      </MenuButtons>
      <DropdownContainer>
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <Button type="text" onClick={(e) => e.preventDefault()}>
            {i18n.t('nucleo-sl')} <DownOutlined />
          </Button>
        </Dropdown>
      </DropdownContainer>
      <MenuButtons>
        <NucleoLabel>{i18n.t('nucleo-sl')}</NucleoLabel>
        <StyledButton type="text">{i18n.t('aviso-legal')}</StyledButton>
        <StyledButton type="text">{i18n.t('politica-datos')}</StyledButton>
        <Link href="/legal/cookies" passHref>
          <StyledButton type="text">{i18n.t('politica-cookies')}</StyledButton>
        </Link>
      </MenuButtons>
    </footer>
  );
};

export default styled(Footer)`
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
