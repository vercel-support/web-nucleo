import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

type Props = {
  imageUrl: string;
  left: boolean;
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
  className?: string;
};

const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
`;

const Image = styled.div<{ imageUrl: string; left: boolean }>`
  height: 100%;
  background-image: ${(props) =>
    props.theme.loadOptimizedImage(props.imageUrl)};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: ${(props) => `center ${props.left ? 'right' : 'left'}`};
  @media ${(props) => props.theme.breakpoints.lg} {
    transform: translateX(${(props) => `${props.left ? '16vw' : '-16vw'}`});
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    background-size: cover;
  }
`;

const Content = styled.div<{ left: boolean }>`
  min-height: calc(((100vw - 58px) / 2) * 0.96 * 0.4972);
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: ${(props) => (props.left ? 'left' : 'right')};
  @media ${(props) => props.theme.breakpoints.xl} {
    min-height: calc(((100vw - 58px) / 3) * 1.89 * 0.4972);
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    min-height: calc(((132vw - 58px) / 2) * 0.95 * 0.4972);
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    min-height: unset;
    text-align: left;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: #ffffff;
    opacity: 0.9;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }
`;

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  @media ${(props) => props.theme.breakpoints.lgu} {
    margin-top: -52px;
  }
`;

const Divider = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
  background-color: #e0e0e0;
`;

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 27px;
  font-weight: 600;
  margin-bottom: 16px;
  @media ${(props) => props.theme.breakpoints.lgd} {
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    line-height: 22px;
  }
`;

const Description = styled.div<{ left: boolean; paragraphIndex: number }>`
  font-size: 18px;
  line-height: 32px;
  @media ${(props) => props.theme.breakpoints.xl} {
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.lgu} {
    margin-right: ${(props) =>
      props.left ? `calc((${props.paragraphIndex} - 1) * 8vw)` : 'unset'};
    margin-left: ${(props) =>
      props.left ? 'unset' : `calc((${props.paragraphIndex} - 1) * 8vw)`};
  }
  @media ${(props) => props.theme.breakpoints.lgd} {
    font-size: 14px;
    line-height: 26px;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    line-height: 22px;
  }
`;

const InfoSection: React.FC<Props> = ({
  imageUrl,
  left,
  title,
  subtitle,
  description1,
  description2,
  description3,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={className}>
      <ImageContainer>
        <Image imageUrl={imageUrl} left={left} />
      </ImageContainer>
      <Content left={left}>
        <Row>
          <Col
            xs={24}
            lg={{ span: 16, offset: left ? 0 : 8 }}
            xl={{ span: 12, offset: left ? 0 : 12 }}
          >
            <Title>{title}</Title>
            <Divider />
            <Subtitle
              dangerouslySetInnerHTML={{
                __html: subtitle,
              }}
            />
            {isMounted && (
              <Fragment>
                <Description
                  id={new Date() + ''}
                  dangerouslySetInnerHTML={{
                    __html: description1,
                  }}
                  left={left}
                  paragraphIndex={0}
                />
                <br />
                <Description
                  id={new Date() + ''}
                  dangerouslySetInnerHTML={{
                    __html: description2,
                  }}
                  left={left}
                  paragraphIndex={1}
                />
                <br />
                <Description
                  id={new Date() + ''}
                  dangerouslySetInnerHTML={{
                    __html: description3,
                  }}
                  left={left}
                  paragraphIndex={2}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default styled(InfoSection)`
  position: relative;
  margin-top: 116px;
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 32px;
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;
