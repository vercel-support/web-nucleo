import styled from 'styled-components';

import { IFlat } from '../../../common/model/flat.model';
import ResultCard from './resultCard';

type Props = {
  flats: IFlat[];
  className?: string;
};

const ResultsSection = ({ flats, className }: Props): JSX.Element => {
  return (
    <div className={className}>
      {flats.map((flat) => (
        <ResultCard key={flat.id} flat={flat} />
      ))}
    </div>
  );
};

export default styled(ResultsSection)`
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;
