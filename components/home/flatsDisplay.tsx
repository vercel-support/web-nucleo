import Flat from '../../backend/salesforce/flat';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';
import styled from 'styled-components';
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
} & WithTranslation;

const SectionTitle = styled.h2`
  font-size: 30px;
  line-height: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
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

const FlatsDisplay = ({ className, t, flats }: Props): JSX.Element => {
  const carousel = useRef(null);

  const isBig = useMediaQuery({ query: '(min-width: 1724px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 1500px)' });
  const isSmall = useMediaQuery({ query: '(min-width: 1300px)' });
  const isVerySmall = useMediaQuery({ query: '(min-width: 1208px)' });
  const isVeryVerySmall = useMediaQuery({ query: '(min-width: 1110px)' });

  let baseFlatCardWith = 340;
  let flatsPerPage = 8;
  if (isBig == true) {
    baseFlatCardWith = 340;
    flatsPerPage = 8;
  } else if (isMedium == true) {
    baseFlatCardWith = 280;
    flatsPerPage = 8;
  } else if (isSmall == true) {
    baseFlatCardWith = 230;
    flatsPerPage = 8;
  } else if (isVerySmall == true) {
    baseFlatCardWith = 280;
    flatsPerPage = 6;
  } else if (isVeryVerySmall == true) {
    baseFlatCardWith = 380;
    flatsPerPage = 4;
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
      <Arrow left={true} rotate={180} onClick={previous} />
      <Carousel ref={carousel} dots={false}>
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
      </Carousel>
      <Arrow left={false} onClick={next} />
    </div>
  );
};

export const FlatsDisplayPlaceholder = styled.div`
  background-color: #f2f2f2;
  height: 80vh;
`;

export default withTranslation('common')(styled(FlatsDisplay)`
  padding: 70px 150px;
  background-color: #f2f2f2;

  position: relative;
`);
