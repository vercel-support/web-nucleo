export interface IFlat {
  id: string;
  pictureUrls: string[];
  price: number;
  rooms: number;
  bathrooms: number;
  sqrMeters: number;
  type: string;
  zone: string;
  address: string;
  city: string;
  county: string;
  description_ES: string;
  description_EN: string;
  showInWebsite: boolean;
  hasElevator: boolean;
  hasGarden: boolean;
  hasBalcony: boolean;
  hasTerrace: boolean;
  hasBasement: boolean;

  approximateLongitude: number;
  approximateLatitude: number;
  mapAreaIds: string[];

  yearConstruction?: number;
  yearReform?: number;
}
