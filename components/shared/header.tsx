import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import useI18n from '../../common/hooks/useI18n';
import LanguageSelector from './languageSelector';

type Props = {
  className?: string;
};

const MenuButtons = styled(Row)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const SellHouseCol = styled(Col)`
  @media ${(props) => props.theme.breakpoints.smd} {
    display: none;
  }
`;

const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary};
  border-color: ${(props) => props.theme.colors.secondary};
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
    opacity: 0.8;
  }
`;

const Header = ({ className }: Props) => {
  const i18n = useI18n();

  return (
    <header className={className}>
      <Link href="/">
        <a>
          <img
            alt={i18n.t('header.logo-alt')}
            src={require('../../public/images/LogoHeaderWeb.svg')}
          />
        </a>
      </Link>
      <MenuButtons gutter={32} align="middle">
        <SellHouseCol>
          <Link href="/vender-casa" passHref>
            <SecondaryButton type="primary">
              {i18n.t('sellHouse.title')}
            </SecondaryButton>
          </Link>
        </SellHouseCol>
        <Col>
          <LanguageSelector themeColor="secondary" />
        </Col>
      </MenuButtons>
    </header>
  );
};

export default styled(Header)`
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

  background-color: rgba(0, 0, 0, 0);
  @media ${(props) => props.theme.breakpoints.mdd} {
    background-color: white;
    position: inherit;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
