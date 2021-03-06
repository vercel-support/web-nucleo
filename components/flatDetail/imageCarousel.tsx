import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import * as flatTypeUtils from '../../common/helpers/flatType.utils';

type Props = {
  flat: IFlat;
  onShowAllPhotosButtonClik: () => void;
  className?: string;
  theme: DefaultTheme;
};

const Title = styled.h2`
  position: absolute;
  left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  width: ${(props) => props.theme.grid.getGridColumns(12, 1)};
  top: 24px;
  font-size: 40px;
  font-weight: 600;
  color: #ffffff;
  z-index: 1;
  @media ${(props) => props.theme.breakpoints.smd} {
    left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    width: ${(props) => props.theme.grid.getGridColumns(20, 1)};
    font-size: 32px;
    font-weight: 500;
  }
`;

const ShowAllPhotosButton = styled(Button)`
  position: absolute;
  right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.smd} {
    right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
  bottom: 24px;
  z-index: 1;
  font-weight: 500;
  border-width: 2px;

  &:active,
  &:hover,
  &:focus {
    color: #fff;
    border-color: #fff;
  }
`;

const FlatImage = styled.div<{ url: string; imageHeight: string }>`
  background-image: linear-gradient(
      352.5deg,
      rgba(51, 46, 49, 0.3) 0%,
      rgba(209, 198, 205, 0) 15%,
      rgba(209, 198, 205, 0) 80%,
      rgba(51, 46, 49, 0.3) 100%
    ),
    linear-gradient(
      270deg,
      rgba(51, 46, 49, 0.2) 0%,
      rgba(209, 198, 205, 0) 15%,
      rgba(209, 198, 205, 0) 85%,
      rgba(51, 46, 49, 0.2) 100%
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
    <div className={className} style={{ position: 'relative' }}>
      <Title>
        {i18n.t('flat.title', {
          type: i18n.t(flatTypeUtils.getFlatTypeLabel(flat.type)),
          address: flat.address,
        })}
      </Title>
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
    margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
  .slick-dots-bottom {
    bottom: 24px;
  }
`);
