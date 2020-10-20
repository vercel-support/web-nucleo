import styled from 'styled-components';

import { IFlat } from '../../common/model/flat.model';
import FlatCard from './flatCard';

type Props = {
  flats: IFlat[];
  cardBackgroundColor?: string;
  focusedCardBackgroundColor?: string;
  focusedFlatIndex?: number;
  parentRef?: any;
  onFlatHover?: (flat: IFlat, index: number) => void;
  className?: string;
};

const CardContainer = styled.div`
  margin-bottom: 32px;
`;

const ResultsSection = ({
  flats,
  className,
  cardBackgroundColor,
  focusedCardBackgroundColor,
  focusedFlatIndex,
  onFlatHover,
  parentRef,
}: Props): JSX.Element => {
  let focusedCardBackgroundColor_ = focusedCardBackgroundColor;
  if (!focusedCardBackgroundColor) {
    focusedCardBackgroundColor_ = cardBackgroundColor;
  }
  return (
    <div className={className} ref={parentRef}>
      {flats.map((flat, i) => {
        const isFocused = i === focusedFlatIndex;
        return (
          <CardContainer key={flat.id}>
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
          </CardContainer>
        );
      })}
    </div>
  );
};

export const ResultsSectionTwoColumns = styled(ResultsSection)`
  @media ${(props) => props.theme.breakpoints.xlu} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
    grid-template-rows: repeat(
      ${(props) => Math.ceil(props.flats.length / 2)},
      1fr
    );
  }
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.lg} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;

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
