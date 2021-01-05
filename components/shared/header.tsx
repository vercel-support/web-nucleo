import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

import useI18n from '../../common/hooks/useI18n';
import { getOffices } from '../../backend/offices';

type Props = {
  alwaysShown?: boolean;
  dropShadow?: boolean;
  hideSellHouseButton?: boolean;
};

const MenuButtons = styled(Row)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const MdDownHiddenCol = styled(Col)`
  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }
`;

const LgUpHiddenCol = styled(Col)`
  @media ${(props) => props.theme.breakpoints.lgu} {
    display: none;
  }
`;

const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary};
  border-color: ${(props) => props.theme.colors.secondary};
  &:hover,
  &:focus,
  &:active {
    background: ${(props) => props.theme.colors.secondary}cb;
    border-color: ${(props) => props.theme.colors.secondary}cb;
  }
`;

const HeaderComp = styled.header<{ alwaysShown: boolean; dropShadow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: ${(props) => props.theme.headerHeight};

  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }

  background-color: ${(props) =>
    props.alwaysShown ? 'white' : 'rgba(0, 0, 0, 0)'};
  position: ${(props) => (props.alwaysShown ? 'inherit' : 'absolute')};
  @media ${(props) => props.theme.breakpoints.mdd} {
    background-color: white;
    position: inherit;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) =>
    props.dropShadow ? '0px 3px 25px rgba(0, 0, 0, 0.15)' : 'inherit'};
`;

const Logo = styled.img`
  height: 32px;
  width: 130px;
`;

const StyledLink = styled.a<{ active: boolean }>`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: ${(props) => (props.active ? 500 : 400)};
`;

const Header = ({
  alwaysShown,
  dropShadow,
  hideSellHouseButton,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const offices = getOffices();

  const officesItems = offices.map((office) => (
    <Menu.Item key={office.id}>
      <Link href={`/oficinas/${office.id}`}>
        <a>{office.name}</a>
      </Link>
    </Menu.Item>
  ));

  const hamburgerMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/vender-casa">
          <a>{i18n.t('header.sellHouse')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/nucleo">
          <a>{i18n.t('header.aboutUs')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/contacto">
          <a>{i18n.t('header.contact')}</a>
        </Link>
      </Menu.Item>
      <Menu.SubMenu
        title={i18n.t('header.offices')}
        popupClassName="hamburger-menu"
      >
        {officesItems}
      </Menu.SubMenu>
      <Menu.Item>
        <Link href="/blog">
          <a>{i18n.t('header.blog')}</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.SubMenu
        title={i18n.t('header.hamburgerLanguage')}
        popupClassName="hamburger-menu"
      >
        <Menu.Item
          onClick={() => {
            i18n.locale('es');
          }}
        >
          <StyledLink active={i18n.activeLocale === 'es'}>Español</StyledLink>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            i18n.locale('en');
          }}
        >
          <StyledLink active={i18n.activeLocale === 'en'}>English</StyledLink>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const officesMenu = <Menu>{officesItems}</Menu>;

  return (
    <HeaderComp alwaysShown={!!alwaysShown} dropShadow={!!dropShadow}>
      <Link href="/">
        <a>
          <Logo
            alt={i18n.t('header.logoAlt')}
            src={require('../../public/images/LogoHeaderWeb.svg')}
          />
        </a>
      </Link>
      <MenuButtons gutter={16} align="middle">
        {!hideSellHouseButton && (
          <MdDownHiddenCol>
            <Link href="/vender-casa" passHref>
              <SecondaryButton type="primary">
                {i18n.t('header.sellHouse')}
              </SecondaryButton>
            </Link>
          </MdDownHiddenCol>
        )}
        <MdDownHiddenCol>
          <Link href="/nucleo" passHref>
            <Button type="text">{i18n.t('header.aboutUs')}</Button>
          </Link>
        </MdDownHiddenCol>
        <MdDownHiddenCol>
          <Link href="/contacto" passHref>
            <Button type="text">{i18n.t('header.contact')}</Button>
          </Link>
        </MdDownHiddenCol>
        <MdDownHiddenCol>
          <Dropdown overlay={officesMenu}>
            <Button type="text" onClick={(e) => e.preventDefault()}>
              {i18n.t('header.offices')} <DownOutlined />
            </Button>
          </Dropdown>
        </MdDownHiddenCol>
        <MdDownHiddenCol>
          <Link href="/blog" passHref>
            <Button type="text">{i18n.t('header.blog')}</Button>
          </Link>
        </MdDownHiddenCol>
        <LgUpHiddenCol>
          <Dropdown
            overlay={hamburgerMenu}
            trigger={['click']}
            overlayClassName="hamburger-menu"
          >
            <Button type="text" shape="circle" icon={<MenuOutlined />}></Button>
          </Dropdown>
        </LgUpHiddenCol>
      </MenuButtons>
    </HeaderComp>
  );
};

export default Header;
