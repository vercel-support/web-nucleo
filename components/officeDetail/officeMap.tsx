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

const MyMapComponent = withGoogleMap(({ office }: Props) => (
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
));

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
  return (
    <MyMapComponent
      office={office}
      containerElement={<MapDiv />}
      mapElement={<MapDiv />}
    />
  );
};

export default OfficeMap;
