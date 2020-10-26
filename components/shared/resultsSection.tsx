import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import FlatCard from './flatCard';

type Props = {
  flats: IFlat[];
  xlSpan?: number;
  cardBackgroundColor?: string;
  focusedCardBackgroundColor?: string;
  focusedFlatIndex?: number;
  parentRef?: any;
  onFlatHover?: (flat: IFlat, index: number) => void;
  className?: string;
};

const ResultsSection = ({
  flats,
  xlSpan = 24,
  cardBackgroundColor,
  focusedCardBackgroundColor,
  focusedFlatIndex,
  parentRef,
  onFlatHover,
  className,
}: Props): JSX.Element => {
  let focusedCardBackgroundColor_ = focusedCardBackgroundColor;
  if (!focusedCardBackgroundColor) {
    focusedCardBackgroundColor_ = cardBackgroundColor;
  }
  return (
    <div className={className} ref={parentRef}>
      <Row gutter={[32, 32]}>
        {flats.map((flat, i) => {
          const isFocused = i === focusedFlatIndex;
          return (
            <Col key={flat.id} xs={24} xl={xlSpan}>
              <FlatCard
                flat={flat}
                cardBackgroundColor={
                  isFocused ? focusedCardBackgroundColor_ : cardBackgroundColor
                }
                useCarousel={true}
                onMouseEnter={() => {
                  if (onFlatHover) {
                    onFlatHover(flat, i);
                  }
                }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default styled(ResultsSection)`
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;
