import styled from 'styled-components';

import { IFlat } from '../../../common/model/flat.model';
import ResultCard from './resultCard';

type Props = {
  flats: IFlat[];
  className?: string;
  cardBackgroundColor?: string;
};

const ResultsSection = ({
  flats,
  className,
  cardBackgroundColor,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      {flats.map((flat) => (
        <ResultCard
          key={flat.id}
          flat={flat}
          cardBackgroundColor={cardBackgroundColor}
        />
      ))}
    </div>
  );
};

export const ResultsSectionTwoColumns = styled(ResultsSection)`
  @media ${(props) => props.theme.breakpoints.lgu} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    grid-template-rows: repeat(
      ${(props) => Math.ceil(props.flats.length / 2)},
      1fr
    );
  }
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
