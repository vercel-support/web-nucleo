import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import styled from 'styled-components';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
  className?: string;
};

const MyMapComponent = withScriptjs(
  withGoogleMap(({ office }: Props) => (
    <GoogleMap
      defaultZoom={15}
      center={{
        lat: office.lat,
        lng: office.long,
      }}
    >
      <Marker
        key={office.id}
        position={{ lat: office.lat, lng: office.long }}
        options={{
          icon: {
            url: '/images/map_marker_selected.svg',
            scaledSize: new window.google.maps.Size(42, 42),
          },
        }}
        zIndex={100}
      />
    </GoogleMap>
  ))
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

const OfficeMap: React.FC<Props> = ({ office }) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
  return (
    <MyMapComponent
      office={office}
      googleMapURL={mapUrl}
      loadingElement={<MapDiv />}
      containerElement={<MapDiv />}
      mapElement={<MapDiv />}
    />
  );
};

export default OfficeMap;
