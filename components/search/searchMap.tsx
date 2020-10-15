import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import styled from 'styled-components';
import { IFlat } from '../../common/model/flat.model';

type Props = {
  flats: IFlat[];
  focusedFlatIndex?: number;
  setFocusedFlat: (flatIndex: number) => void;
  className?: string;
};

const MyMapComponent = withScriptjs(
  withGoogleMap(({ flats, setFocusedFlat, focusedFlatIndex }: Props) => {
    const focusedIndex = focusedFlatIndex || 0;
    if (flats.length <= focusedIndex) {
      return null;
    }
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: flats[focusedIndex].approximateLatitude,
          lng: flats[focusedIndex].approximateLongitude,
        }}
        options={{ fullscreenControl: false, scrollwheel: true }}
      >
        {flats.map((flat, i) => {
          const iconUrl =
            focusedFlatIndex == i
              ? '/images/map_marker_selected.svg'
              : '/images/map_marker.svg';
          return (
            <Marker
              key={flat.id}
              position={{
                lat: flat.approximateLatitude,
                lng: flat.approximateLongitude,
              }}
              options={{
                icon: {
                  url: iconUrl,
                  scaledSize: new window.google.maps.Size(42, 42),
                },
              }}
              onClick={() => {
                setFocusedFlat(i);
              }}
              zIndex={focusedFlatIndex == i ? 100 : 0}
            />
          );
        })}
      </GoogleMap>
    );
  })
);

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100vh;
`;

const SearchMap: React.FC<Props> = ({
  flats,
  focusedFlatIndex,
  setFocusedFlat,
}) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
  if (flats.length <= 0) {
    return null;
  }
  return (
    <MyMapComponent
      focusedFlatIndex={focusedFlatIndex}
      flats={flats}
      setFocusedFlat={setFocusedFlat}
      googleMapURL={mapUrl}
      loadingElement={<MapDiv />}
      containerElement={<MapDiv />}
      mapElement={<MapDiv />}
    />
  );
};

export default SearchMap;
