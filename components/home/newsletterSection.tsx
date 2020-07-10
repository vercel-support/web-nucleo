import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { Input } from 'antd';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;

  background-image: url(/images/banner_newsletter.png);
  @media ${(props) => props.theme.breakpoints.mdd} {
    background-image: url(/images/banner_newsletter_small.png);
  }

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;

const SectionTitle = styled.h2`
  max-width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }

  text-align: right;

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const StyledInput = styled(Input.Search)`
  max-width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }

  margin-top: 8px;
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
