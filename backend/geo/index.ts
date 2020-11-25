import fs from 'fs';
import * as d3 from 'd3-geo';

import { IFlat } from '../../common/model/flat.model';
import { IZone } from '../../common/model/zone.model';

type Properties = {
  name: string;
  shapeLength: number;
  shapeArea: number;
};

import geoDataRaw from './geo_data.json';
const geoData = geoDataRaw as d3.ExtendedFeatureCollection<
  d3.ExtendedFeature<d3.GeoGeometryObjects, Properties>
>;

export const computeMapAreaId = (
  longitude: number,
  latitude: number
): string => {
  for (const feature of geoData.features) {
    if (d3.geoContains(feature, [longitude, latitude])) {
      return feature.properties.name;
    }
  }
  return null;
};

export const computeZones = (flats: IFlat[]): Record<string, IZone> => {
  const zones: Record<string, IZone> = {};
  for (const feature of geoData.features) {
    const hasFlats = flats.some((flat) =>
      d3.geoContains(feature, [
        flat.approximateLongitude,
        flat.approximateLatitude,
      ])
    );
    const homeMapImagesPath = `${process.cwd()}/public/images/home_map/`;
    const url = fs.existsSync(
      `${homeMapImagesPath}${feature.properties.name}.svg`
    )
      ? `/images/home_map/${feature.properties.name}.svg`
      : null;
    zones[feature.properties.name] = {
      url,
      hasFlats,
    };
  }
  zones['0'] = {
    url: '/images/home_map/0.svg',
    hasFlats: true,
  };
  return zones;
};
