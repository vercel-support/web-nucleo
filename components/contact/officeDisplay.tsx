import { IOffice } from '../../common/model/office.model';
import styled from 'styled-components';
import OfficeMap from './officeMap';
type Props = {
  offices: IOffice[];
  selectedOfficeIndex: number;
  setSelectedOffice: (officeIndex: number) => void;
  className?: string;
};

const OfficeImage = styled.div<{ src: string }>`
  background-image: ${(props) => props.theme.loadOptimizedImage(props.src)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 380px;
  flex: 1;

  border-radius: ${(props) => props.theme.borderRadius};
  min-width: 341px;
  margin-left: 4px;
  margin-right: 4px;
  @media ${(props) => props.theme.breakpoints.smd} {
    margin-top: 20px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    min-width: 250px;
  }
`;

const OfficeDisplay = ({
  offices,
  selectedOfficeIndex,
  setSelectedOffice,
  className,
}: Props): JSX.Element => {
  const selectedOffice = offices[selectedOfficeIndex];
  return (
    <div className={className}>
      <OfficeMap
        offices={offices}
        selectedOfficeIndex={selectedOfficeIndex}
        setSelectedOffice={setSelectedOffice}
      />
      <OfficeImage src={selectedOffice.imageUrl} />
    </div>
  );
};

export default styled(OfficeDisplay)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  margin-top: 48px;
  margin-bottom: 48px;

  @media ${(props) => props.theme.breakpoints.smd} {
    flex-direction: column;
    align-items: stretch;
  }
`;
