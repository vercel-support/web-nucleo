import { IFlat } from '../common/model/flat.model';
import { euclideanDistance } from '../common/helpers';

export const getNearFlats = (
  flats: IFlat[],
  currentFlatIndex: number,
  nRecommendations: number
): IFlat[] => {
  const flatsWithoutCurrent = [...flats];
  flatsWithoutCurrent.splice(currentFlatIndex, 1);

  if (nRecommendations >= flatsWithoutCurrent.length) {
    return flatsWithoutCurrent;
  }

  const currentFlat = flats[currentFlatIndex];
  const flatsWithDistances = flatsWithoutCurrent
    .map((flat) => {
      return {
        flat: flat,
        distance: euclideanDistance(
          currentFlat.approximateLatitude,
          currentFlat.approximateLongitude,
          flat.approximateLatitude,
          flat.approximateLongitude
        ),
      };
    })
    .sort((x, y) => x['distance'] - y['distance']);
  return flatsWithDistances
    .slice(0, nRecommendations)
    .map((item) => item['flat']);
};
