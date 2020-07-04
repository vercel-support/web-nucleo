import styled from 'styled-components';
import LanguageSelector from './languageSelector';
import { Button } from 'antd';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';

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
`;

const Footer = ({ className, t }: Props) => {
  return (
    <footer className={className}>
      <MenuButtons>
        <LanguageSelector themeColor="secondary" />
      </MenuButtons>
      <MenuButtons>
        <p
          css={`
            padding: 4px 15px;
          `}
        >
          {t('nucleo-sl')}
        </p>
        <Button type="text">{t('aviso-legal')}</Button>
        <Button type="text">{t('politica-datos')}</Button>
        <Button type="text">{t('politica-cookies')}</Button>
      </MenuButtons>
    </footer>
  );
};

export default styled(withTranslation('common')(Footer))`
  width: 100%;
  height: 80px;

  background-color: white;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
