import * as d3 from 'd3-geo';

type Properties = {
  name: string;
};

type GeoJsonFile = {
  name: string;
  geoJson: d3.ExtendedFeatureCollection<
    d3.ExtendedFeature<d3.GeoGeometryObjects, Properties>
  >;
};

import zeroRaw from './0.json';
const zero = zeroRaw as d3.ExtendedFeatureCollection<
  d3.ExtendedFeature<d3.GeoGeometryObjects, Properties>
>;

import oneAlacantiRaw from "./1_L'Alacantí.json";
const oneAlacanti = oneAlacantiRaw as d3.ExtendedFeatureCollection<
  d3.ExtendedFeature<d3.GeoGeometryObjects, Properties>
>;

export const geoJsonFiles: GeoJsonFile[] = [
  {
    name: '0',
    geoJson: zero,
  },
  {
    name: "1_L'Alacantí",
    geoJson: oneAlacanti,
  },
];
