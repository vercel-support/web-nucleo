import Flat from '../../backend/salesforce/flat';
import { WithTranslation } from 'next-i18next';
import nextI18Next from '../../i18n';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { useRef } from 'react';
import { PlayCircleFilled } from '@ant-design/icons';
import { split } from '../../common/helpers';
import FlatCard from './flatCard';

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
  let carousel = useRef(null);

  const flatCardWidth = '240px';
  const flatCardMargin = '8px';
  const flatsPerPage = 8; // TODO change depending on screen size

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
      <Arrow left rotate={180} onClick={previous} />
      <Carousel ref={carousel} dots={false}>
        {flatPages.map((page, i) => (
          <div>
            <FlatsPage key={`page_${i}`}>
              {page.map((flat) => (
                <FlatCard
                  width={flatCardWidth}
                  margin={flatCardMargin}
                  key={flat.name}
                  flat={flat}
                />
              ))}
              {page.map(() => (
                <HackyFiller width={flatCardWidth} margin={flatCardMargin} />
              ))}
            </FlatsPage>
          </div>
        ))}
      </Carousel>
      <Arrow onClick={next} />
    </div>
  );
};

export default withTranslation('common')(styled(FlatsDisplay)`
  padding: 70px 150px;
  background-color: #f2f2f2;

  position: relative;
`);
