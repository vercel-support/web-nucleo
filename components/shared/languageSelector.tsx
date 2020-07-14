import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { WithTranslation, TFunction, I18n } from 'next-i18next';
import styled from 'styled-components';
import nextI18Next from '../../i18n';

const { withTranslation } = nextI18Next;

const StyledMenu = styled(Menu)`
  border-radius: 0;
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const menu = (t: TFunction, i18n: I18n) => (
  <StyledMenu>
    <Menu.Item
      key="0"
      onClick={() => {
        i18n.changeLanguage('es');
      }}
    >
      <StyledLink>Español</StyledLink>
    </Menu.Item>
    <Menu.Item
      key="1"
      onClick={() => {
        i18n.changeLanguage('en');
      }}
    >
      <StyledLink>English</StyledLink>
    </Menu.Item>
  </StyledMenu>
);

type Props = { themeColor?: string } & WithTranslation;

const ColorLink = styled.a<{ themeColor: string }>`
  color: ${(props) => props.theme.colors[props.themeColor]};
`;

const LanguageSelector = ({ t, i18n, themeColor = 'primary' }: Props) => {
  return (
    <Dropdown overlay={menu(t, i18n)} trigger={['click']}>
      <ColorLink
        themeColor={themeColor}
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        {t('idioma')} <DownOutlined />
      </ColorLink>
    </Dropdown>
  );
};

export default withTranslation('common')(LanguageSelector);
