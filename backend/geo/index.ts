import fs from 'fs';
import { join } from 'path';
import { booleanPointInPolygon, point } from '@turf/turf';

import { IFlat } from '../../common/model/flat.model';
import { IZone } from '../../common/model/zone.model';

import { FeatureCollection, Polygon } from '@turf/helpers';

type Properties = {
  name: string;
};
type GeoJsonContent = FeatureCollection<Polygon, Properties>;
type GeoJsonFile = {
  name: string;
  geoJson: GeoJsonContent;
};

const loadGeoJsonFiles = async (): Promise<GeoJsonFile[]> => {
  const basePath = `${process.cwd()}/public`;
  const innerPath = '/geojson/';
  const folder = join(basePath, innerPath);
  const filenames = fs.readdirSync(folder).filter(x => x.endsWith('.json'));

  const res = [];
  for (const filename of filenames) {
    const json = fs.readFileSync(join(folder, filename), 'utf8');
    const obj = JSON.parse(json);
    const geoJsonContent = { ...obj } as GeoJsonContent;
    const geoJsonFile = {
      name: filename.replace('.json', ''),
      geoJson: geoJsonContent,
    };
    res.push(geoJsonFile);
  }

  return res;
};

export const computeMapAreaId = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  const geoJsonFiles = await loadGeoJsonFiles();
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

const computeSubzones = (
  flats: IFlat[],
  geoJsonFiles: GeoJsonFile[],
  geoJsonFile: GeoJsonFile
): Record<string, IZone> => {
  let zonesAux = {};

  for (const feature of geoJsonFile.geoJson.features) {
    const homeMapImagesPath = `${process.cwd()}/public/images/home_map/`;
    const url = fs.existsSync(
      `${homeMapImagesPath}${feature.properties.name}.svg`
    )
      ? `/images/home_map/${feature.properties.name}.svg`
      : null;

    let hasFlats = false;
    const subGeoJsonFile = geoJsonFiles.find(
      (f) => f.name === feature.properties.name
    );
    if (subGeoJsonFile) {
      const subzones = computeSubzones(flats, geoJsonFiles, subGeoJsonFile);
      if (Object.keys(subzones).length > 0) {
        zonesAux = { ...zonesAux, ...subzones };
        hasFlats = Object.entries(subzones).some(([k]) => subzones[k].hasFlats);
      }
    } else {
      hasFlats = flats.some(
        (flat) => flat.mapAreaId === feature.properties.name
      );
    }

    const polygonCoordinates = feature.geometry.coordinates[0].map((c) => {
      return { lat: c[1], lng: c[0] };
    });

    zonesAux[feature.properties.name] = {
      url,
      hasFlats,
      polygonCoordinates,
    };
  }

  return zonesAux;
};

export const computeZones = async (
  flats: IFlat[]
): Promise<Record<string, IZone>> => {
  const geoJsonFiles = await loadGeoJsonFiles();

  const zones: Record<string, IZone> = {
    '0': {
      url: '/images/home_map/0.svg',
      hasFlats: true,
    },
  };
  return {
    ...zones,
    ...computeSubzones(flats, geoJsonFiles, geoJsonFiles[0]),
  };
};
