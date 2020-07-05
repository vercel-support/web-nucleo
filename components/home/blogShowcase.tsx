import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;

  background-image: url(/images/banner_blog.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 14px 10%;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 42px;
  line-height: 42px;
  max-width: 25%;

  color: ${(props) => props.theme.colors.secondary};
`;

const SectionSubtitle = styled.h3`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  max-width: 25%;
  margin-top: 8px;

  color: ${(props) => props.theme.colors.secondary};
`;

const BlogShowcase = ({ t }: Props): JSX.Element => {
  return (
    <Banner>
      <SectionTitle>{t('blog-showcase-title')}</SectionTitle>
      <SectionSubtitle>{t('blog-showcase-subtitle')}</SectionSubtitle>
    </Banner>
  );
};
export default withTranslation('common')(BlogShowcase);
