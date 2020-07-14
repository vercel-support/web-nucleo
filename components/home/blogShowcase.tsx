import styled from 'styled-components';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';

const { withTranslation } = i18Next;

type Props = WithTranslation;

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;

  @media ${(props) => props.theme.breakpoints.lg} {
    min-height: 0;
    height: 260px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    min-height: 240px;
  }

  @media ${(props) => props.theme.breakpoints.smd} {
    min-height: 0;
    height: 220px;
  }

  background-image: url(${require('../../public/images/tangram_blog.png')}), url(${require('../../public/images/banner_blog.png')});

  background-size: 100% 100%, auto 100%;

  background-position: center center, right center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const SectionTitle = styled.h2`
  max-width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(17, 1)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const SectionSubtitle = styled.h3`
  max-width: ${(props) => props.theme.grid.getGridColumns(7, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}
  line-height: 125%;
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: var(--gutter);
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const BlogShowcase = ({ t }: Props): JSX.Element => {
  return (
    <Banner>
      <SectionTitle>{t('blog-showcase-title')}</SectionTitle>
      <Divider />
      <SectionSubtitle>{t('blog-showcase-subtitle')}</SectionSubtitle>
    </Banner>
  );
};
export default withTranslation('common')(BlogShowcase);
