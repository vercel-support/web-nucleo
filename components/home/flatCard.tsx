import Flat from '../../backend/salesforce/flat';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel, Tag } from 'antd';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { useRef, useEffect } from 'react';

const { withTranslation } = i18Next;

type Props = {
  flat: Flat;
  className?: string;
  theme: DefaultTheme;
  imageHeight: string;
} & WithTranslation;

const FlatImage = styled.img<{ url: string; imageHeight: string }>`
  background-image: url(${(props) => props.url});
  background-color: red;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  height: ${(props) => props.imageHeight};
  width: 100%;
`;

const FlatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  padding: 8px;
`;

const TopText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

const BottomText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
`;

const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.shadow};
  width: 100%;
`;

const StyledTag = styled(Tag)`
  font-weight: 500;
  font-size: 12px;
  line-height: inherit;
  float: right;
`;

const FlatCard = ({
  flat,
  className,
  theme,
  t,
  imageHeight,
}: Props): JSX.Element => {
  const carousel = useRef(null);

  let timeout = null;

  function laggedNext() {
    timeout = setTimeout(() => {
      carousel.current.next();
    }, 500);
  }

  function clearNext() {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  useEffect(() => {
    return function cleanup() {
      clearNext();
    };
  });

  return (
    <div
      className={className}
      onMouseEnter={laggedNext}
      onMouseLeave={clearNext}
      onMouseDown={clearNext}
    >
      <Carousel ref={carousel} dots={false} draggable={true}>
        {flat.pictureUrls.map((url) => (
          <FlatImage imageHeight={imageHeight} key={url} url={url} />
        ))}
      </Carousel>
      <FlatInfo>
        <TopText>
          <span>{flat.price}€</span>
          <StyledTag color={theme.colors.secondary}>{flat.zone}</StyledTag>
        </TopText>
        <Divider />
        <BottomText>
          <span
            css={`
              margin-right: 8px;
            `}
          >
            {flat.sqrMeters}m<sup>2</sup>
          </span>
          <span>
            {flat.rooms} {t('habitaciones')}
          </span>
        </BottomText>
      </FlatInfo>
    </div>
  );
};

export default withTheme(styled(withTranslation('common')(FlatCard))<{
  width: string;
  margin: string;
}>`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 2px 6px;
  }
`);
