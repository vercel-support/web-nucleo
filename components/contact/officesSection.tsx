import styled from 'styled-components';
import OfficeSelector from './officeSelector';
import OfficeDisplay from './officeDisplay';
import { IOffice } from '../../common/model/office.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  offices: IOffice[];
  className?: string;
  selectedOfficeIndex: number;
  setSelectedOffice: (index: number) => void;
};

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 38px !important;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px !important;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 26px !important;
  }
`;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 64px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`;

const OfficeDetailsContainer = styled.div`
  text-align: center;
  ${(props) => props.theme.font.p1}
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const ContactFormSection = ({
  offices,
  className,
  selectedOfficeIndex,
  setSelectedOffice,
}: Props): JSX.Element => {
  const i18n = useI18n();
  const selectedOffice = offices[selectedOfficeIndex];
  return (
    <div className={className}>
      <Title>{i18n.t('contact.offices.title')}</Title>
      <Divider />
      <OfficeSelector
        offices={offices}
        selectedOfficeIndex={selectedOfficeIndex}
        setSelectedOffice={setSelectedOffice}
      />
      <OfficeDisplay
        offices={offices}
        selectedOfficeIndex={selectedOfficeIndex}
        setSelectedOffice={setSelectedOffice}
      />
      <OfficeDetailsContainer>
        <span style={{ fontWeight: 500 }}>{selectedOffice.name}: </span>
        <a
          href={`https://maps.google.com/?q=${selectedOffice.lat},${selectedOffice.long}`}
        >
          <span>{selectedOffice.address}</span>
          <span> {selectedOffice.postalCode} </span>
          <span>{selectedOffice.city} </span>
        </a>
        <span>{selectedOffice.phone}</span>
      </OfficeDetailsContainer>
    </div>
  );
};

export default styled(ContactFormSection)`
  margin-top: 64px;
  background-color: white;
  padding-top: 56px;
  padding-bottom: 48px;
  overflow: hidden;
`;
