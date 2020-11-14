import * as d3 from 'd3-geo';

type Properties = {
  objectId: number;
  name: string;
  type: string;
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
      return `${
        feature.properties.type
      }_${feature.properties.name.toLowerCase()}`;
    }
  }
  return null;
};
