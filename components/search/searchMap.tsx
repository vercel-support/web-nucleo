import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from 'react-google-maps';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import { IFlat } from '../../common/model/flat.model';

type Props = {
  flats: IFlat[];
  focusedFlatIndex: number;
  highlightedCoordinates: { lat: number; lng: number }[];
  onMarkerClick: (flatIndex: number) => void;
  theme: DefaultTheme;
};

const MyMapComponent = withScriptjs(
  withGoogleMap(
    ({
      flats,
      focusedFlatIndex,
      highlightedCoordinates,
      onMarkerClick,
      theme,
    }: Props) => {
      const isMdd = useMediaQuery({ query: theme.breakpoints.mdd });

      if (flats.length === 0) {
        return null;
      }

      const renderRegions = () => {
        if (!highlightedCoordinates.length) {
          return null;
        }
        return (
          <Polygon
            path={highlightedCoordinates}
            options={{
              strokeColor: '#EF7048',
              strokeOpacity: 1,
              strokeWeight: 1,
              fillColor: '#EF9981',
              fillOpacity: 0.2,
            }}
          />
        );
      };

      return (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: flats[focusedFlatIndex].approximateLatitude,
            lng: flats[focusedFlatIndex].approximateLongitude,
          }}
          options={{
            fullscreenControl: false,
            gestureHandling: 'greedy',
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: !isMdd,
          }}
        >
          {renderRegions()}
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
                  onMarkerClick(i);
                }}
                zIndex={focusedFlatIndex == i ? 100 : 0}
              />
            );
          })}
        </GoogleMap>
      );
    }
  )
);

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100vh;
`;

const SearchMap: React.FC<Props> = ({
  flats,
  focusedFlatIndex,
  onMarkerClick,
  highlightedCoordinates,
  theme,
}) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

  if (flats.length <= 0) {
    return null;
  }

  return (
    <MyMapComponent
      flats={flats}
      focusedFlatIndex={focusedFlatIndex}
      onMarkerClick={onMarkerClick}
      highlightedCoordinates={highlightedCoordinates}
      theme={theme}
      googleMapURL={mapUrl}
      loadingElement={<MapDiv />}
      containerElement={<MapDiv />}
      mapElement={<MapDiv />}
    />
  );
};

export default withTheme(SearchMap);
