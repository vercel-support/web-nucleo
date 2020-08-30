export class IFlat {
  id: string;
  pictureUrls: string[];
  price: number;
  rooms: number;
  bathrooms: number;
  sqrMeters: number;
  type: string;
  zone: string;
  city: string;
  description_ES: string;
  description_EN: string;
  showInWebsite: boolean;
  hasElevator: boolean;
  hasGarden: boolean;
  hasBalcony: boolean;
  hasTerrace: boolean;
  hasBasement: boolean;

  yearConstruction?: number;
  yearReform?: number;
}
