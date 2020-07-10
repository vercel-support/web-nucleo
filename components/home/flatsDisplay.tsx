import Flat from '../../backend/salesforce/flat';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Carousel } from 'antd';
import { useRef } from 'react';
import { PlayCircleFilled } from '@ant-design/icons';
import { split } from '../../common/helpers';
import FlatCard from './flatCard';
import { useMediaQuery } from 'react-responsive';

const { withTranslation } = nextI18Next;

type Props = {
  flats: Flat[];
  className?: string;
  theme: DefaultTheme;
} & WithTranslation;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}

  @media ${(props) => props.theme.breakpoints.lgu} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(2, 0)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(2, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(1, 0)};
    margin-right: 0;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(2, 0)};
    margin-right: 0;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(4, 0)};
    margin-right: 0;
  }
`;

const Arrow = styled(PlayCircleFilled)<{ left?: boolean }>`
  position: absolute;
  margin: 0;
  top: 50%;
  left: ${(props) => (props.left ? '4%' : 'inherit')};
  right: ${(props) => (!props.left ? '4%' : 'inherit')};
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  font-size: 38px;
  color: ${(props) => props.theme.colors.secondary};
`;

const FlatsPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

// SEE: https://stackoverflow.com/questions/16377972/how-to-align-left-last-row-line-in-multiple-line-flexbox
const HackyFiller = styled.div<{ width: string; margin: string }>`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: 0;
`;

const StyledCarousel = styled(Carousel)`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 0)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 0)};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const FlatsDisplay = ({ className, t, flats, theme }: Props): JSX.Element => {
  const carousel = useRef(null);

  const isXxl = useMediaQuery({ query: theme.breakpoints.xxl });
  const isXl = useMediaQuery({ query: theme.breakpoints.xl });
  const isXlSmall = useMediaQuery({
    query: '(min-width: 1200px) and (max-width: 1300px)',
  });
  const isLg = useMediaQuery({ query: theme.breakpoints.lg });
  const isMd = useMediaQuery({ query: theme.breakpoints.md });
  const isSm = useMediaQuery({ query: theme.breakpoints.sm });
  const isXs = useMediaQuery({ query: theme.breakpoints.xs });

  // 1200 - 1296 (xl)
  let baseFlatCardWith = 340;
  let flatsPerPage = 8;
  if (isXxl == true) {
    baseFlatCardWith = 320;
    flatsPerPage = 8;
  } else if (isXl == true) {
    baseFlatCardWith = 255;
    flatsPerPage = 8;
    if (isXlSmall == true) {
      baseFlatCardWith = 225;
      flatsPerPage = 8;
    }
  } else if (isLg == true) {
    baseFlatCardWith = 380;
    flatsPerPage = 4;
  } else if (isMd == true) {
    baseFlatCardWith = 505;
    flatsPerPage = 1;
  } else if (isSm == true) {
    baseFlatCardWith = 397;
    flatsPerPage = 1;
  } else if (isXs == true) {
    baseFlatCardWith = 397;
    flatsPerPage = 1;
  }

  const aspectRatio = 1.68;
  const flatCardWidth = `${baseFlatCardWith}px`;
  const flatCardImageHeight = `${Math.round(baseFlatCardWith / aspectRatio)}px`;
  const flatCardMargin = '8px';

  function previous() {
    carousel.current.prev();
  }

  function next() {
    carousel.current.next();
  }

  const flatPages = split(flats, flatsPerPage);

  return (
    <div className={className}>
      <SectionTitle>{t('section-flats-title')}</SectionTitle>
      {isLg || isXl || isXxl ? (
        <Arrow left={true} rotate={180} onClick={previous} />
      ) : null}
      <StyledCarousel
        ref={carousel}
        dots={false}
        draggable={!(isLg || isXl || isXxl)}
        centerMode={!(isLg || isXl || isXxl)}
        centerPadding={!(isLg || isXl || isXxl) ? '20%' : null}
      >
        {flatPages.map((page, i) => (
          <div key={`page_${i}`}>
            <FlatsPage>
              {page.map((flat) => (
                <FlatCard
                  width={flatCardWidth}
                  margin={flatCardMargin}
                  key={flat.name}
                  flat={flat}
                  imageHeight={flatCardImageHeight}
                  useCarousel={isLg || isXl || isXxl}
                />
              ))}
              {page.map((flat) => (
                <HackyFiller
                  key={flat.name}
                  width={flatCardWidth}
                  margin={flatCardMargin}
                />
              ))}
            </FlatsPage>
          </div>
        ))}
      </StyledCarousel>
      {isLg || isXl || isXxl ? <Arrow left={false} onClick={next} /> : null}
    </div>
  );
};

export const FlatsDisplayPlaceholder = styled.div`
  background-color: #f2f2f2;
  height: 80vh;
`;

export default withTheme(styled(withTranslation('common')(FlatsDisplay))`
  background-color: #f2f2f2;
  padding-top: 70px;
  padding-bottom: 70px;

  position: relative;
`);
