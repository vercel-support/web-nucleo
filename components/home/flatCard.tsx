import Flat from '../../backend/salesforce/flat';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel, Tag } from 'antd';
import i18Next from '../../i18n';
import { WithTranslation } from 'next-i18next';
import { useRef, useEffect } from 'react';
import { formatCurrency } from '../../common/helpers';
import Link from 'next/link';

const { withTranslation } = i18Next;

type Props = {
  flat: Flat;
  className?: string;
  theme: DefaultTheme;
  useCarousel?: boolean;
  imageHeight: string;
} & WithTranslation;

const FlatImage = styled.img<{ url: string; imageHeight: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  height: ${(props) => props.imageHeight};
  width: 100%;
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
`;

const FlatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  padding: 8%;
`;

const TopText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: ${(props) => props.theme.colors.secondary};
`;

const BottomText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.colors.secondary};
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
  useCarousel = true,
}: Props): JSX.Element => {
  const carousel = useRef(null);

  let timeout = null;

  function laggedNext() {
    if (useCarousel == false) {
      return;
    }
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
    <Link href={`/pisos/${flat.id}`}>
      <div
        className={className}
        onMouseEnter={laggedNext}
        onMouseLeave={clearNext}
        onMouseDown={clearNext}
      >
        {useCarousel ? (
          <Carousel ref={carousel} dots={true} draggable={true}>
            {flat.pictureUrls.map((url) => (
              <FlatImage imageHeight={imageHeight} key={url} url={url} />
            ))}
          </Carousel>
        ) : (
          <FlatImage imageHeight={imageHeight} url={flat.pictureUrls[0]} />
        )}
        <FlatInfo>
          <TopText>
            <span
              css={`
                font-weight: 600;
              `}
            >
              {formatCurrency(flat.price)}€
            </span>
            <StyledTag color={theme.colors.secondary}>{flat.zone}</StyledTag>
          </TopText>
          <Divider />
          <BottomText>
            <span
              css={`
                margin-right: 8px;
              `}
            >
              {flat.sqrMeters}m
              <sup
                css={`
                  vertical-align: top;
                  font-size: 0.6em;
                `}
              >
                2
              </sup>
            </span>
            <span>
              {flat.rooms} {t('habitaciones')}
            </span>
          </BottomText>
        </FlatInfo>
      </div>
    </Link>
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
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  }
`);
