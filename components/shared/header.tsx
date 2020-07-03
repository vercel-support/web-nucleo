import styled from 'styled-components';
import { Button } from 'antd';

type Props = {
  className: string;
};

const MenuButtons = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: ${props => props.theme.font.family};
  font-style: ${props => props.theme.font.style};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

const Header = ({ className }: Props) => {
  return (
    <header className={className}>
      <img src="/images/LogoHeaderWeb.svg" />
      <MenuButtons>
        <Button
          size="middle"
          type="text"
          css={`
            color: ${props => props.theme.colors.secondary};
          `}
        >
          Esp
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
