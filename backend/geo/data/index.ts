import * as d3 from 'd3-geo';

type Properties = {
  name: string;
};

type GeoJsonContent = d3.ExtendedFeatureCollection<
d3.ExtendedFeature<GeoJSON.Polygon, Properties>
>;

type GeoJsonFile = {
  name: string;
  geoJson: GeoJsonContent;
};

import zeroRaw from './0.json';
const zero = zeroRaw as GeoJsonContent;

import oneAlacantiRaw from "./1_Alacantí.json";
const oneAlacanti = oneAlacantiRaw as GeoJsonContent;

export const geoJsonFiles: GeoJsonFile[] = [
  {
    name: '0',
    geoJson: zero,
  },
  {
    name: "1_Alacantí",
    geoJson: oneAlacanti,
  },
];
