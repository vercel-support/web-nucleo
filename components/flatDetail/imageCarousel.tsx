import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Flat from '../../backend/salesforce/flat';

type Props = {
  flat: Flat;
  className?: string;
  theme: DefaultTheme;
};

const Title = styled.div`
  position: absolute;
  left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  right: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
  top: 24px;
  font-weight: 600;
  font-size: 40px;
  color: #ffffff;
  z-index: 1;
`;

const FlatImage = styled.div<{ url: string; imageHeight: string }>`
  background-image: linear-gradient(
      325.4deg,
      rgba(209, 198, 205, 0) 9.24%,
      rgba(51, 46, 49, 0.65) 78%
    ),
    url(${(props) => props.url});
  opacity: 0.9;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  height: ${(props) => props.imageHeight};
  width: 100%;
`;

const PrevArrow = styled.div`
  &:before {
    display: none;
  }
  width: 40px !important;
  height: 40px !important;
  background-image: url(/images/prev.svg) !important;
  left: ${(props) => props.theme.grid.getGridColumns(1, 1)} !important;
  z-index: 1;
`;

const NextArrow = styled.div`
  &:before {
    display: none;
  }
  width: 40px !important;
  height: 40px !important;
  background-image: url(/images/next.svg) !important;
  right: ${(props) => props.theme.grid.getGridColumns(1, 1)} !important;
  z-index: 1;
`;

const ImageCarousel = ({ flat, className, theme }: Props): JSX.Element => {
  const isMdUp = useMediaQuery({ query: theme.breakpoints.mdu });

  return (
    <div className={className} style={{ position: 'relative' }}>
      <Title>{flat.name}</Title>
      <Carousel
        arrows={true}
        dots={isMdUp}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={'60vh'} key={url} url={url} />
        ))}
      </Carousel>
    </div>
  );
};

export default withTheme(styled(ImageCarousel)`
  .slick-dots-bottom {
    bottom: 24px;
  }
`);
