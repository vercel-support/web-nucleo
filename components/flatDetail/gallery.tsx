import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import { Modal, Carousel } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  flat: IFlat;
  visible: boolean;
  onCancel: () => void;
};

const modalHeaderHeight = '55px';
const modalFooterHeight = '65px';

const StyledModal = styled(Modal)`
  width: 88%;

  .ant-modal-header {
    height: ${modalHeaderHeight};
  }
  .ant-modal-footer {
    height: ${modalFooterHeight};
    padding: 23px 24px;
    position: relative;
    text-align: center;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    padding: 0;

    .ant-modal-content {
      border-radius: 0;
    }

    .ant-modal-body {
      height: calc(100vh - ${modalHeaderHeight} - ${modalFooterHeight});
      overflow-y: scroll;
    }
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

const Arrow = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.left ? '24px' : 'inherit')};
  right: ${(props) => (!props.left ? '24px' : 'inherit')};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-image: url(${(props) =>
    props.left
      ? require('../../public/images/prev_black.svg')
      : require('../../public/images/next_black.svg')});
  cursor: pointer;
`;

const Gallery: React.FC<Props> = ({ flat, visible, onCancel }): JSX.Element => {
  const i18n = useI18n();

  const carouselRef = useRef(null);

  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);

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
    <StyledModal
      title={i18n.t('flat.pictures')}
      visible={visible}
      footer={
        <Fragment>
          <Arrow left={true} onClick={prev} />
          <span>{`${carouselCurrentIndex + 1} / ${
            flat.pictureUrls.length
          }`}</span>
          <Arrow left={false} onClick={next} />
        </Fragment>
      }
      centered
      bodyStyle={{ padding: 0 }}
      onCancel={onCancel}
    >
      <Carousel
        dots={false}
        lazyLoad={'progressive'}
        beforeChange={(_previousIndex, currentIndex) =>
          setCarouselCurrentIndex(currentIndex)
        }
        afterChange={(currentIndex) => setCarouselCurrentIndex(currentIndex)}
        ref={carouselRef}
      >
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={'72vh'} key={url} url={url} />
        ))}
      </Carousel>
    </StyledModal>
  );
};

export default Gallery;
