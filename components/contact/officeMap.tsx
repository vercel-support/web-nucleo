import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import styled from 'styled-components';
import { IOffice } from '../../common/model/office.model';

type Props = {
  offices: IOffice[];
  selectedOfficeIndex: number;
  setSelectedOffice: (officeIndex: number) => void;
  className?: string;
};

const MyMapComponent = withScriptjs(
  withGoogleMap(
    ({ offices, selectedOfficeIndex, setSelectedOffice }: Props) => (
      <GoogleMap
        defaultZoom={15}
        center={{
          lat: offices[selectedOfficeIndex].lat,
          lng: offices[selectedOfficeIndex].long,
        }}
      >
        {offices.map((office, i) => {
          const iconUrl =
            selectedOfficeIndex == i
              ? '/images/map_marker_selected.svg'
              : '/images/map_marker.svg';
          return (
            <Marker
              key={office.id}
              position={{ lat: office.lat, lng: office.long }}
              options={{
                icon: {
                  url: iconUrl,
                  scaledSize: new window.google.maps.Size(42, 42),
                },
              }}
              onClick={() => {
                setSelectedOffice(i);
              }}
              zIndex={selectedOfficeIndex == i ? 100 : 0}
            />
          );
        })}
      </GoogleMap>
    )
  )
);

const MapDiv = styled.div`
  height: 380px;
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius};
  min-width: 341px;
  @media ${(props) => props.theme.breakpoints.xs} {
    min-width: 250px;
  }

  margin-left: 4px;
  margin-right: 4px;
`;

const OfficeMap = ({
  offices,
  selectedOfficeIndex,
  setSelectedOffice,
}: Props) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
  return (
    <MyMapComponent
      selectedOfficeIndex={selectedOfficeIndex}
      offices={offices}
      setSelectedOffice={setSelectedOffice}
      googleMapURL={mapUrl}
      loadingElement={<MapDiv />}
      containerElement={<MapDiv />}
      mapElement={<MapDiv />}
    />
  );
};

export default OfficeMap;
