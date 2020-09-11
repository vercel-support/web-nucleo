import { IOffice } from '../common/model/office.model';

const offices: IOffice[] = [
  {
    id: '1',
    name: 'Florida Portazgo',
    address: 'C/ Cruz del Sur, 31',
    postalCode: '03006',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 965 999 554',
    imageUrl: '/images/office_florida.png',
  },
  {
    id: '2',
    name: 'Benalúa',
    address: 'C/ Pérez Medina, 23',
    postalCode: '03007',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 865 604 769',
    imageUrl: '/images/office_benalua.png',
  },
  {
    id: '3',
    name: 'San Blas',
    address: 'C/ Bono Guarner, 381',
    postalCode: '03005',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 966 236 012',
    imageUrl: '/images/office_san_blas.png',
  },
  {
    id: '4',
    name: 'Sant Joan',
    address: 'C/ Tomas Capelo, 8',
    postalCode: '03550',
    city: "Sant Joan d'Alacant",
    country: 'España',
    phone: '(+34) 865 885 752',
    imageUrl: '/images/office_sant_joan.png',
  },
  {
    id: '5',
    name: 'Torrevieja Playa del Cura',
    address: 'Av. de las Habaneras, 70',
    postalCode: '03182',
    city: 'Torrevieja',
    country: 'España',
    phone: '(+34) 601 408 940',
    imageUrl: '/images/office_torrevieja.png',
  },
];

export const getOffices = (): IOffice[] => {
  return offices;
};
