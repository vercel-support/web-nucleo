import React, { useRef, useState, useEffect } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col, Carousel } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { IFlat } from '../../common/model/flat.model';
import { split } from '../../common/helpers';
import FlatCard from './flatCard';

type Props = {
  flats: IFlat[];
  title: string;
  arrows?: boolean;
  className?: string;
  theme: DefaultTheme;
};

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const Divider = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Placeholder = styled.div`
  height: 600px;
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const Arrow = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.left ? '4%' : 'inherit')};
  right: ${(props) => (!props.left ? '4%' : 'inherit')};
  transform: translateY(calc(-50% - 28px));
  width: 40px;
  height: 40px;
  background-image: ${(props) =>
    props.left ? 'url(/images/prev_black.svg)' : 'url(/images/next_black.svg)'};
  cursor: pointer;
  z-index: 1;
`;

const FlatPage = styled.div`
  padding-bottom: 72px;
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.lgd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
`;

const FlatPageRow = styled(Row)`
  margin-bottom: -16px !important;
`;

const FlatsDisplay: React.FC<Props> = ({
  flats,
  title,
  arrows,
  className,
  theme,
}) => {
  const carouselRef = useRef(null);

  const isXxl = useMediaQuery({ query: theme.breakpoints.xxl });
  const isXl = useMediaQuery({ query: theme.breakpoints.xl });
  const isLg = useMediaQuery({ query: theme.breakpoints.lg });
  const isMd = useMediaQuery({ query: theme.breakpoints.md });
  const isSm = useMediaQuery({ query: theme.breakpoints.sm });
  const isXs = useMediaQuery({ query: theme.breakpoints.xs });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let flatsPerPage: number;
  let centerPadding: string = undefined;
  if (isXxl) {
    flatsPerPage = 8;
  } else if (isXl) {
    flatsPerPage = 6;
  } else {
    flatsPerPage = 1;
    if (isLg) {
      centerPadding = '25%';
    } else if (isMd) {
      centerPadding = '20%';
      flatsPerPage = 1;
    } else if (isSm) {
      centerPadding = '15%';
      flatsPerPage = 1;
    } else if (isXs) {
      centerPadding = '10%';
      flatsPerPage = 1;
    }
  }

  const flatPages = split(flats, flatsPerPage);

  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className={className}>
      <Title>{title}</Title>
      <Divider />
      {isMounted ? (
        <RelativeDiv>
          {arrows && (isXl || isXxl) && <Arrow left={true} onClick={prev} />}
          <Carousel
            dots={false}
            lazyLoad={'ondemand'}
            centerMode={!(isXl || isXxl)}
            centerPadding={centerPadding}
            draggable={!(isXl || isXxl)}
            ref={carouselRef}
          >
            {flatPages.map((flatPage, i) => (
              <div key={`page_${i}`}>
                <FlatPage>
                  <FlatPageRow gutter={[32, 32]} justify="center">
                    {flatPage.map((flat) => (
                      <Col key={flat.id} xs={24} xl={8} xxl={6}>
                        <FlatCard
                          flat={flat}
                          forceVerticalMode={true}
                          useCarousel={isXl || isXxl}
                        />
                      </Col>
                    ))}
                  </FlatPageRow>
                </FlatPage>
              </div>
            ))}
          </Carousel>
          {arrows && (isXl || isXxl) && <Arrow left={false} onClick={next} />}
        </RelativeDiv>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default withTheme(styled(FlatsDisplay)`
  padding-top: 48px;
`);
