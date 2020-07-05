import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { Input } from 'antd';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;

  background-image: url(/images/banner_newsletter.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding: 14px 10%;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 42px;
  line-height: 42px;
  max-width: 25%;

  text-align: right;

  color: ${(props) => props.theme.colors.secondary};
`;

const StyledInput = styled(Input.Search)`
  margin-top: 8px;
  max-width: 25%;
`;

const NewsletterSection = ({ t }: Props): JSX.Element => {
  return (
    <Banner>
      <SectionTitle>{t('newsletter-title')}</SectionTitle>
      <StyledInput enterButton={t('enviar')} placeholder={t('email')} />
    </Banner>
  );
};
export default withTranslation('common')(NewsletterSection);
