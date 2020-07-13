import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { Input } from 'antd';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('banner_newsletter.png')};

  @media ${(props) => props.theme.breakpoints.mdd} {
    background-image: ${(props) =>
      props.theme.loadOptimizedImage('banner_newsletter_small.png')};
  }

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
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
  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: ${(props) => props.theme.grid.getGridColumns(9, 1)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    max-width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(20, 1)};
  }
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: var(--gutter);
  margin-right: 14px;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const NewsletterSection = ({ t }: Props): JSX.Element => {
  return (
    <Banner>
      <SectionTitle>{t('newsletter-title')}</SectionTitle>
      <Divider />
      <StyledInput enterButton={t('enviar')} placeholder={t('email')} />
    </Banner>
  );
};
export default withTranslation('common')(NewsletterSection);
