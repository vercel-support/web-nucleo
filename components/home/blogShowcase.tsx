import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';

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

  background-image: url(${require('../../public/images/tangram_blog.png')}),
    url(${require('../../public/images/banner_blog.png')});

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
  max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(13, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const SectionSubtitle = styled.h3`
  max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(11, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
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
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 15px;
`;

const BlogShowcase = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Banner>
      <SectionTitle>{i18n.t('blog-showcase-title')}</SectionTitle>
      <Divider />
      <SectionSubtitle>{i18n.t('blog-showcase-subtitle')}</SectionSubtitle>
    </Banner>
  );
};
export default BlogShowcase;
