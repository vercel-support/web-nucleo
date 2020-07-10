import styled from 'styled-components';
import LanguageSelector from './languageSelector';

type Props = {
  className?: string;
};

const MenuButtons = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const Header = ({ className }: Props) => {
  return (
    <header className={className}>
      <img src="/images/LogoHeaderWeb.svg" />
      <MenuButtons>
        <LanguageSelector themeColor="secondary" />
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
  height: 80px;

  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
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
