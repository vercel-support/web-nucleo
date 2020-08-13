import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import useI18n from '../../common/hooks/useI18n';

type Props = { themeColor?: string };

const StyledMenu = styled(Menu)`
  border-radius: 0;
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const ColorLink = styled.a<{ themeColor: string }>`
  color: ${(props) => props.theme.colors[props.themeColor]};
`;

const LanguageSelector = ({ themeColor = 'primary' }: Props): JSX.Element => {
  const i18n = useI18n();

  const menu = (
    <StyledMenu>
      <Menu.Item
        key="0"
        onClick={() => {
          i18n.locale('es');
        }}
      >
        <StyledLink>Español</StyledLink>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          i18n.locale('en');
        }}
      >
        <StyledLink>English</StyledLink>
      </Menu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <ColorLink
        themeColor={themeColor}
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        {i18n.t('idioma')} <DownOutlined />
      </ColorLink>
    </Dropdown>
  );
};

export default LanguageSelector;
