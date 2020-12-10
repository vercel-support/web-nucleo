import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  className?: string;
};

const Banner = styled.div`
  height: 40vh;
  min-height: 260px;

  background-image: url(${require('../../public/images/tangram_blog.png')}),
    url(${require('../../public/images/banner_blog.png')});
  background-size: 100% 100%, auto 100%;
  background-position: center center, right center;
  background-repeat: no-repeat;

  @media ${(props) => props.theme.breakpoints.lg} {
    height: 260px;
    min-height: 0;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    min-height: 240px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    height: unset;
    min-height: 0;
    background-image: url(${require('../../public/images/banner_blog.png')});
    background-size: auto 100%;
    background-position: right center;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 14px ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding: 14px ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.xs} {
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: #ffffff;
    opacity: 0.9;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
    padding: 32px;
  }
`;

const SectionTitle = styled.h2`
  max-width: ${(props) => props.theme.grid.getGridColumns(14, 1)};
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(13, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: inherit;
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const SectionSubtitle = styled.h3`
  ${(props) => props.theme.font.p1}
  max-width: ${(props) => props.theme.grid.getGridColumns(10, 1)};
  color: ${(props) => props.theme.colors.secondary};
  line-height: 125%;
  margin-bottom: 16px;
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(11, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: inherit;
  }
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: var(--gutter);
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const BlogShowcaseLgu: React.FC<Props> = ({ className }) => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Banner>
        <Container>
          <SectionTitle>{i18n.t('home.blog-showcase-title')}</SectionTitle>
          <Divider />
          <SectionSubtitle>
            {i18n.t('home.blog-showcase-subtitle')}
          </SectionSubtitle>
          <Link href="/blog" passHref>
            <Button type="primary" htmlType="button">
              {i18n.t('home.blog-button')}
            </Button>
          </Link>
        </Container>
      </Banner>
    </div>
  );
};

export default styled(BlogShowcaseLgu)`
  @media ${(props) => props.theme.breakpoints.lgu} {
    display: none;
  }
`;
