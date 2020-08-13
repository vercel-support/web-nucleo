import { useState } from 'react';
import styled from 'styled-components';
import { Modal, Carousel } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  flat: IFlat;
  visible: boolean;
  onCancel: () => void;
};

const StyledModal = styled(Modal)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};

  & .ant-modal-footer {
    padding: 24px 16px;
  }
`;

const FlatImage = styled.div<{ url: string; imageHeight: string }>`
  background-image: url(${(props) => props.url});
  background-size: contain;
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
  background-image: url(/images/prev_black.svg) !important;
  left: ${(props) => props.theme.grid.getGridColumns(1, 1)} !important;
  bottom: -56px;
  top: unset !important;
  z-index: 1;
`;

const NextArrow = styled.div`
  &:before {
    display: none;
  }
  width: 40px !important;
  height: 40px !important;
  background-image: url(/images/next_black.svg) !important;
  right: ${(props) => props.theme.grid.getGridColumns(1, 1)} !important;
  bottom: -56px;
  top: unset !important;
  z-index: 1;
`;

const Footer = styled.div`
  text-align: center;
`;

const Gallery = ({ flat, visible, onCancel }: Props): JSX.Element => {
  const i18n = useI18n();
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);

  return (
    <StyledModal
      title={i18n.t('flat.pictures')}
      visible={visible}
      footer={
        <Footer>{`${carouselCurrentIndex + 1} / ${
          flat.pictureUrls.length
        }`}</Footer>
      }
      centered
      width={'88%'}
      bodyStyle={{ padding: 0 }}
      onCancel={onCancel}
    >
      <Carousel
        arrows={true}
        dots={false}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        lazyLoad={'progressive'}
        beforeChange={(_previousIndex, currentIndex) =>
          setCarouselCurrentIndex(currentIndex)
        }
        afterChange={(currentIndex) => setCarouselCurrentIndex(currentIndex)}
      >
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={'72vh'} key={url} url={url} />
        ))}
      </Carousel>
    </StyledModal>
  );
};

export default Gallery;
