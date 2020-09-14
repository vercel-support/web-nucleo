import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  flat: IFlat;
  onShowAllPhotosButtonClik: () => void;
  className?: string;
  theme: DefaultTheme;
};

const TitleContainer = styled.div`
  position: relative;
`;

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
}: Props): JSX.Element => {
  const i18n = useI18n();
  const isSmDown = useMediaQuery({ query: theme.breakpoints.smd });

  return (
    <div className={className}>
      <TitleContainer>
        <Title>
          {i18n.t('flatDetail.imageCarouselTitle', {
            type: i18n.t(`flatTypes.${flat.type}`),
            address: flat.address,
          })}
        </Title>
      </TitleContainer>
      <ShowAllPhotosButton
        type={'default'}
        ghost
        onClick={() => onShowAllPhotosButtonClik()}
      >
        {i18n.t('flatDetail.actions.showAllPhotos')}
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

export default withTheme(styled(ImageCarousel)`
  @media ${(props) => props.theme.breakpoints.xxl} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
  .slick-dots-bottom {
    bottom: 24px;
  }
`);
