import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Modal, Carousel } from 'antd';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  visible: boolean;
  onCancel: () => void;
} & WithTranslation;

const StyledModal = styled(Modal)`
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};

  top: 24px;
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

const Gallery = ({ flat, visible, onCancel, t }: Props): JSX.Element => {
  return (
    <StyledModal
      title={t('flat.pictures')}
      visible={visible}
      footer={null}
      width={'90%'}
      onCancel={onCancel}
    >
      <Carousel
        arrows={true}
        dots={false}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={'80vh'} key={url} url={url} />
        ))}
      </Carousel>
    </StyledModal>
  );
};

export default withTranslation('common')(Gallery);
