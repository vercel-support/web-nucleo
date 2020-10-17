import Flat from './salesforce/flat';

function euclideanDistance(x1, y1, x2, y2) {
  const xdiff = Math.pow(x1 - x2, 2);
  const ydiff = Math.pow(y1 - y2, 2);
  return Math.sqrt(xdiff + ydiff);
}

export const getNearFlats = (
  flats: Flat[],
  currentFlatIndex: number,
  nRecommendations: number
): Flat[] => {
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
