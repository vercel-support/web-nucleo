import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';

const { withTranslation } = nextI18Next;

const Background = styled.div`
  background-image: url(/images/HeroHome.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 55vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  margin-left: 10%;
  margin-top: 50px;
  margin-bottom: 8px;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
  font-weight: bold;
  font-size: 42px;
  line-height: 22px;
`;

const TitleParagraph = styled.p<{ themeColor: string }>`
  font-weight: bold;
  font-size: 8vh;
  line-height: 4px;
  letter-spacing: -0.05em;
  color: ${(props) => props.theme.colors[props.themeColor]};
`;

const Divider = styled.hr`
  width: 86px;
  margin-top: 24px;
  margin-bottom: 18px;
  margin-left: 0;
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const Subtitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  max-width: 60%;
`;

type Props = WithTranslation;

const Hero = ({ t }: Props): JSX.Element => {
  return (
    <Background>
      <Title>
        <TitleParagraph themeColor="primary">
          {t('hero-title-1')}
        </TitleParagraph>
        <TitleParagraph themeColor="secondary">
          {t('hero-title-2')}
        </TitleParagraph>
        <Divider />
        <Subtitle>{t('hero-subtitle')}</Subtitle>
      </Title>
    </Background>
  );
};
export default withTranslation('common')(Hero);
