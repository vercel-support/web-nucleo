import styled, { withTheme, DefaultTheme } from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Carousel, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  onShowAllPhotosButtonClik: () => void;
  className?: string;
  theme: DefaultTheme;
} & WithTranslation;

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

const ShowAllPhotosButton = styled(Button)`
  position: absolute;
  right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
  bottom: 24px;
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

const ImageCarousel = ({
  flat,
  onShowAllPhotosButtonClik,
  className,
  theme,
  t,
}: Props): JSX.Element => {
  const isSmDown = useMediaQuery({ query: theme.breakpoints.smd });

  return (
    <div className={className} style={{ position: 'relative' }}>
      <Title>{flat.address}</Title>
      <ShowAllPhotosButton
        type={'default'}
        ghost
        onClick={() => onShowAllPhotosButtonClik()}
      >
        {t('flatDetail.actions.showAllPhotos')}
      </ShowAllPhotosButton>
      <Carousel
        arrows={true}
        dots={!isSmDown}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        lazyLoad={'progressive'}
      >
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={'72vh'} key={url} url={url} />
        ))}
      </Carousel>
    </div>
  );
};

export default withTheme(styled(withTranslation('common')(ImageCarousel))`
  .slick-dots-bottom {
    bottom: 24px;
  }
`);
