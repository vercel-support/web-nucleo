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

  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: 0;

  @media ${(props) => props.theme.breakpoints.xlu} {
    margin-left: calc(${(props) => props.theme.grid.getGridColumns(2, 1)});
    margin-right: calc(${(props) => props.theme.grid.getGridColumns(2, 1)});
  }
`;

const Arrow = styled.div<{ left?: boolean }>`
  position: absolute;
  margin: 0;
  top: 50%;
  left: ${(props) => (props.left ? '4%' : 'inherit')};
  right: ${(props) => (!props.left ? '4%' : 'inherit')};
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);


  background-image: url(${(props) => props.left ? require('../../public/images/prev_black.svg') : require('../../public/images/next_black.svg')});
  cursor: pointer;
  width: 40px;
  height: 40px;

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

  @media ${(props) => props.theme.breakpoints.lgd} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Divider = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #e0e0e0;
`;

const FlatsDisplay = ({ className, t, flats, theme }: Props): JSX.Element => {
  const carousel = useRef(null);

  const isXxl = useMediaQuery({ query: theme.breakpoints.xxl });
  const isXxlSmall = useMediaQuery({
    query: '(min-width: 1600px) and (max-width: 1800px)',
  });
  const isXl = useMediaQuery({ query: theme.breakpoints.xl });
  const isXlSmall = useMediaQuery({
    query: '(min-width: 1200px) and (max-width: 1300px)',
  });
  const isLg = useMediaQuery({ query: theme.breakpoints.lg });
  const isMd = useMediaQuery({ query: theme.breakpoints.md });
  const isSm = useMediaQuery({ query: theme.breakpoints.sm });
  const isXs = useMediaQuery({ query: theme.breakpoints.xs });

  let centerPadding = null;
  let baseFlatCardWith = 340;
  let flatsPerPage = 8;
  if (isXxl == true) {
    baseFlatCardWith = 380;
    flatsPerPage = 8;
    if (isXxlSmall == true) {
      baseFlatCardWith = 300;
      flatsPerPage = 8;
    }
  } else if (isXl == true) {
    baseFlatCardWith = 255;
    flatsPerPage = 8;
    if (isXlSmall == true) {
      baseFlatCardWith = 225;
      flatsPerPage = 8;
    }
  } else if (isLg == true) {
    centerPadding = '30%';
    baseFlatCardWith = 505;
    flatsPerPage = 1;
  } else if (isMd == true) {
    centerPadding = '30%';
    baseFlatCardWith = 505;
    flatsPerPage = 1;
  } else if (isSm == true) {
    centerPadding = '20%';
    baseFlatCardWith = 397;
    flatsPerPage = 1;
  } else if (isXs == true) {
    centerPadding = '10%';
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
      <Divider />
      {isXl || isXxl ? (
        <Arrow left={true} onClick={previous} />
      ) : null}
      <StyledCarousel
        ref={carousel}
        dots={false}
        draggable={!(isXl || isXxl)}
        centerMode={!(isXl || isXxl)}
        centerPadding={centerPadding}
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
                  useCarousel={isXl || isXxl}
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
      {isXl || isXxl ? <Arrow left={false} onClick={next} /> : null}
    </div>
  );
};

export const FlatsDisplayPlaceholder = styled.div`
  background-color: #f2f2f2;
  height: 80vh;
`;

export default withTheme(styled(withTranslation('common')(FlatsDisplay))`
  background-color: #f2f2f2;
  padding-top: 100px;
  padding-bottom: 70px;

  position: relative;
`);
