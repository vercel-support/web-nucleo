import { IOffice } from '../common/model/office.model';

const offices: IOffice[] = [
  {
    id: '1',
    shortName: 'Florida Portazgo',
    name: 'Florida Portazgo',
    address: 'C/ Cruz del Sur, 31',
    postalCode: '03006',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 965 999 554',
    imageUrl: 'office_florida.jpeg',
    lat: 38.3462567,
    long: -0.5103588,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Florida.+NUCLEO+FLORIDA+PORTAZGO/@38.3462617,-0.5103588,19.25z/data=!4m12!1m6!3m5!1s0xd62366890300001:0x968da5cf59a9786c!2sInmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Florida.+NUCLEO+FLORIDA+PORTAZGO!8m2!3d38.3462567!4d-0.5098425!3m4!1s0xd62366890300001:0x968da5cf59a9786c!8m2!3d38.3462567!4d-0.5098425',
  },
  {
    id: '2',
    shortName: 'Benalúa',
    name: 'Benalúa',
    address: 'C/ Pérez Medina, 23',
    postalCode: '03007',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 865 604 769',
    imageUrl: 'office_benalua.jpeg',
    lat: 38.3412706,
    long: -0.5010799,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Benal%C3%BAa/@38.3412706,-0.5010799,15.95z/data=!4m8!1m2!2m1!1sinmobiliaria+nucleo+benalua!3m4!1s0xd62364618d2a5b7:0xa9750b6ec6a34db6!8m2!3d38.3406149!4d-0.4977093',
  },
  {
    id: '3',
    shortName: 'San Blas',
    name: 'San Blas',
    address: 'C/ Bono Guarner, 381',
    postalCode: '03005',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 966 236 012',
    imageUrl: 'office_san_blas.jpeg',
    lat: 38.346534,
    long: -0.5001649,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+San+Blas/@38.346534,-0.5001649,17z/data=!3m1!4b1!4m5!3m4!1s0xd62374113fdf303:0xbfed6cfce0850f5e!8m2!3d38.346534!4d-0.4979709',
  },
  {
    id: '4',
    shortName: "Sant Joan d'Alacant",
    name: "Sant Joan d'Alacant",
    address: 'C/ Tomas Capelo, 8',
    postalCode: '03550',
    city: "Sant Joan d'Alacant",
    country: 'España',
    phone: '(+34) 865 885 752',
    imageUrl: 'office_sant_joan.jpeg',
    lat: 38.3982973,
    long: -0.4358574,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+San+Juan+de+Alicante+-+Alicante/@38.3982973,-0.4358574,17z/data=!3m1!4b1!4m5!3m4!1s0xd6239f8a9cd5b85:0x3bc9fe23981ca599!8m2!3d38.3982973!4d-0.4336634',
  },
  {
    id: '5',
    shortName: 'Torrevieja',
    name: 'Torrevieja Playa del Cura',
    address: 'Av. de las Habaneras, 70',
    postalCode: '03182',
    city: 'Torrevieja',
    country: 'España',
    phone: '(+34) 601 408 940',
    imageUrl: 'office_torrevieja.jpeg',
    lat: 37.9803418,
    long: -0.6842526,
    mapUrl:
      'https://www.google.com/maps/place/N%C3%BAcleo+Gestiones+Inmobiliarias/@37.9803418,-0.6842526,14z/data=!4m8!1m2!2m1!1sinmobiliaria+nucleo+Torrevieja!3m4!1s0xd63abc8a55b56f7:0xe582b3ae7d50867c!8m2!3d37.9803418!4d-0.6667431',
  },
];

export const getOffices = (): IOffice[] => {
  return offices;
};
