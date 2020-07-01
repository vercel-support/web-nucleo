import styled from 'styled-components';
import { Button } from 'antd';

type Props = {
  className: string;
};

const Logo = styled.img`
  color: white;
`;

const MenuButtons = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: Circular Std;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const Header = ({ className }: Props) => {
  return (
    <header className={className}>
      <Logo src="/images/LogoHorWeb.svg" />
      <MenuButtons>
        <Button size="middle" type="text" css={`
            color: #A61D24;
        `}>
          Búsqueda
        </Button>
        <Button size="middle" type="text" css={`
            color: #A61D24;
        `}>
          Quiénes somos
        </Button>
        <Button size="middle" css={`
            background: #A61D24;
            border-radius: 2px;
            color: white;
        `}>
          Propietarios
        </Button>
      </MenuButtons>
    </header>
  );
};

export default styled(Header)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;

  background-color: rgba(0, 0, 0, 0);
  padding-left: 69px;
  padding-right: 81px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
