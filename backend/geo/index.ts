import fs from 'fs';
import { booleanPointInPolygon, point } from '@turf/turf';

import { geoJsonFiles } from './data';
import { IFlat } from '../../common/model/flat.model';
import { IZone } from '../../common/model/zone.model';

export const computeMapAreaId = (
  longitude: number,
  latitude: number
): string => {
  for (const geoJsonFile of geoJsonFiles) {
    for (const feature of geoJsonFile.geoJson.features) {
      if (
        geoJsonFiles.findIndex((f) => f.name === feature.properties.name) ===
          -1 &&
        booleanPointInPolygon(point([longitude, latitude]), feature.geometry)
      ) {
        return feature.properties.name;
      }
    }
  }
  return null;
};

export const computeZones = (flats: IFlat[]): Record<string, IZone> => {
  const zones: Record<string, IZone> = {};
  for (const geoJsonFile of geoJsonFiles) {
    for (const feature of geoJsonFile.geoJson.features) {
      const homeMapImagesPath = `${process.cwd()}/public/images/home_map/`;
      const url = fs.existsSync(
        `${homeMapImagesPath}${feature.properties.name}.svg`
      )
        ? `/images/home_map/${feature.properties.name}.svg`
        : null;

      const hasFlats = flats.some((flat) => {
        return booleanPointInPolygon(
          point([flat.approximateLongitude, flat.approximateLatitude]),
          feature.geometry
        );
      });

      const polygonCoordinates = feature.geometry.coordinates[0].map((c) => {
        return { lat: c[1], lng: c[0] };
      });

      zones[feature.properties.name] = {
        url,
        hasFlats,
        polygonCoordinates,
      };
    }
  }
  zones['0'] = {
    url: '/images/home_map/0.svg',
    hasFlats: true,
  };
  return zones;
};
