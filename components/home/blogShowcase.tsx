import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { IMyPost } from '../../common/model/wp/post.model';
import useI18n from '../../common/hooks/useI18n';
import PostCard from './postCard';

type Props = {
  lastPosts: IMyPost[];
  className?: string;
};

const Title = styled.h2`
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

const Divider = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
  background-color: #e0e0e0;
`;

const PostCardsContainer = styled.div`
  padding: 8px;
`;

const InfoContainer = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const Subtitle = styled.div`
  ${(props) => props.theme.font.p1}
  margin-bottom: 24px;
  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }
`;

const VisitBlogButton = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;

const BlogShowcaseLgu: React.FC<Props> = ({ lastPosts, className }) => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Title>{i18n.t('home.blog-showcase-title')}</Title>
      <Divider />
      <PostCardsContainer>
        <Row
          gutter={[
            { xs: 0, sm: 0, md: 0, lg: 32 },
            { xs: 32, sm: 32, md: 32, lg: 0 },
          ]}
        >
          {lastPosts.map((post) => (
            <Col key={post.id} xs={24} lg={8}>
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
        <InfoContainer>
          <Subtitle>{i18n.t('home.blog-showcase-subtitle')}</Subtitle>
          <Row justify="center">
            <Col xs={20} md={10} lg={8} xl={6}>
              <Link href="/blog" passHref>
                <VisitBlogButton type="primary" htmlType="button" size="large">
                  {i18n.t('home.blog-button')}
                </VisitBlogButton>
              </Link>
            </Col>
          </Row>
        </InfoContainer>
      </PostCardsContainer>
    </div>
  );
};

export default styled(BlogShowcaseLgu)`
  padding-top: 3rem;
  padding-bottom: 24px;
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-top: 2rem;
  }
`;
