import React from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import TextClamp from 'react-string-clamp';

import { IMyPost } from '../../common/model/wp/post.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  post: IMyPost;
  className?: string;
};

const horizontalPadding = '20px';

const StyledAnchor = styled.a`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const ImageAnchor = styled.a`
  flex: 1;
`;

const Image = styled.div<{ imageUrl: string }>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
  height: 100%;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 12px;
  padding: 0 ${horizontalPadding};
  @media ${(props) => props.theme.breakpoints.mdd} {
    font-size: 16px;
  }
`;

const Excerpt = styled.div`
  margin-top: 16px;
  padding: 0 ${horizontalPadding};
  font-size: 14px;
  line-height: 1.6;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
  }
`;

const KeepReadingLink = styled.div`
  margin-top: 16px;
  padding: 0 ${horizontalPadding};
  font-size: 14px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
  }
`;

const StyledRightOutlined = styled(RightOutlined)`
  font-size: 10px;
`;

const FlatCard: React.FC<Props> = ({ post, className }) => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Title>
        <StyledAnchor href={post.link}>{post.titleRendered}</StyledAnchor>
      </Title>
      <ImageAnchor href={post.link}>
        <Image imageUrl={post.featuredMediaUrl} />
      </ImageAnchor>
      <Excerpt>
        <TextClamp text={post.excerptRendered} lines={4} element="p" />
      </Excerpt>
      <KeepReadingLink>
        <a href={post.link}>
          <span>{i18n.t('home.blog-keep-reading')}</span>{' '}
          <StyledRightOutlined />
        </a>
      </KeepReadingLink>
    </div>
  );
};

export default styled(FlatCard)`
  height: 460px;
  display: flex;
  flex-direction: column;
  background-color: white;
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 20px 0;
`;
