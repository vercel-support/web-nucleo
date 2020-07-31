import styled from 'styled-components';
import LanguageSelector from './languageSelector';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';

const { withTranslation } = nextI18Next;

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
`;

const Header = ({ className, t }: Props) => {
  return (
    <header className={className}>
      <Link href="/">
        <a>
          <img
            alt={t('header.logo-alt')}
            src={require('../../public/images/LogoHeaderWeb.svg')}
          />
        </a>
      </Link>
      <MenuButtons>
        <LanguageSelector themeColor="secondary" />
      </MenuButtons>
    </header>
  );
};

export default styled(withTranslation('common')(Header))`
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
