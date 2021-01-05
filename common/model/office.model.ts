import { IEmployee } from './employee.model';

export interface IOffice {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  imageUrl: string;
  lat: number;
  long: number;
  mapUrl: string;
  description: string;
  employees: IEmployee[];
}
