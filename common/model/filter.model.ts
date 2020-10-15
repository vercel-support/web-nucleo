export interface IFilter {
  types?: string[];
  priceMin?: number;
  priceMax?: number;
  sqrtMetersMin?: number;
  sqrtMetersMax?: number;
  rooms?: number[];
  roomsMin?: number;
  bathrooms?: number[];
  bathroomsMin?: number;
  characteristics?: string[];
}
