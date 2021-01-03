import { IOffice } from '../common/model/office.model';

const offices: IOffice[] = [
  {
    id: 'florida-portazgo',
    name: 'Florida Portazgo',
    address: 'C/ Cruz del Sur, 31',
    postalCode: '03006',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 965 999 554',
    imageUrl: 'florida_portazgo/office_outside.jpeg',
    lat: 38.3462567,
    long: -0.5103588,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Florida.+NUCLEO+FLORIDA+PORTAZGO/@38.3462617,-0.5103588,19.25z/data=!4m12!1m6!3m5!1s0xd62366890300001:0x968da5cf59a9786c!2sInmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Florida.+NUCLEO+FLORIDA+PORTAZGO!8m2!3d38.3462567!4d-0.5098425!3m4!1s0xd62366890300001:0x968da5cf59a9786c!8m2!3d38.3462567!4d-0.5098425',
    description: null,
    employees: [],
  },
  {
    id: 'benalua',
    name: 'Benalúa',
    address: 'C/ Pérez Medina, 23',
    postalCode: '03007',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 865 604 769',
    imageUrl: 'benalua/office_outside.jpeg',
    lat: 38.3412706,
    long: -0.5010799,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+Benal%C3%BAa/@38.3412706,-0.5010799,15.95z/data=!4m8!1m2!2m1!1sinmobiliaria+nucleo+benalua!3m4!1s0xd62364618d2a5b7:0xa9750b6ec6a34db6!8m2!3d38.3406149!4d-0.4977093',
    description: null,
    employees: [
      {
        name: 'Daniel Rivas',
        position: 'MANAGER',
        imageUrl: 'benalua/daniel_rivas.jpeg',
      },
      {
        name: 'Ezequiel Álvarez',
        position: 'ADVISOR',
        imageUrl: 'benalua/ezequiel_alvarez.jpeg',
      },
      {
        name: 'Lilian Muniz',
        position: 'ADVISOR_F',
        imageUrl: 'benalua/lilian_muniz.jpeg',
      },
      {
        name: 'Rubén Garri',
        position: 'ADVISOR',
        imageUrl: 'benalua/ruben_garri.jpeg',
      },
      {
        name: 'Víctor Carratalá',
        position: 'ADVISOR',
        imageUrl: 'benalua/victor_carratala.jpeg',
      },
    ],
  },
  {
    id: 'san-blas',
    name: 'San Blas',
    address: 'C/ Bono Guarner, 38',
    postalCode: '03005',
    city: 'Alicante',
    country: 'España',
    phone: '(+34) 966 236 012',
    imageUrl: 'san_blas/office_outside.jpeg',
    lat: 38.346534,
    long: -0.5001649,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+Alicante+-+San+Blas/@38.346534,-0.5001649,17z/data=!3m1!4b1!4m5!3m4!1s0xd62374113fdf303:0xbfed6cfce0850f5e!8m2!3d38.346534!4d-0.4979709',
    description:
      'Les presentamos uno de los mejores barrios de Alicante, San Blas, donde destaca por su cercanía al centro y a la estación de RENFE.<br><br>En el barrio encontramos edificios emblemáticos como el famoso edifico de Felipe Harche o la Plaza Padre Fontova.<br><br>Por otro lado, el barrio de San Blas es muy conocido por su gran motivación, la fantástica fiesta de Moros y Cristianos donde puedes disfrutar de la hospitalidad de todos los vecinos de San Blas, disfrutar de maravillosos desfiles y de la música en las calles saliendo de sus barracas.<br><br>También hay que destacar todos los servicios que ofrece el barrio de San Blas como son supermercados, peluquerías, colegios, polideportivos, autobuses, comercios, restaurantes… sin olvidarnos de su conexión con el centro de la ciudad donde podemos encontrar la maravillosa Plaza de los Luceros, el Corte Inglés, el parque de Canalejas, la Explanada, el puerto y la playa.<br><br>En conclusión, es una zona fantástica donde puedes encontrar todo lo que necesitas y poder vivir todo el año.',
    employees: [],
  },
  {
    id: 'sant-joan-dalacant',
    name: "Sant Joan d'Alacant",
    address: 'C/ Tomas Capelo, 8',
    postalCode: '03550',
    city: "Sant Joan d'Alacant",
    country: 'España',
    phone: '(+34) 865 885 752',
    imageUrl: 'sant_joan_dalacant/office_outside.jpeg',
    lat: 38.3982973,
    long: -0.4358574,
    mapUrl:
      'https://www.google.com/maps/place/Inmobiliaria+N%C3%BAcleo:+Inmobiliaria+en+San+Juan+de+Alicante+-+Alicante/@38.3982973,-0.4358574,17z/data=!3m1!4b1!4m5!3m4!1s0xd6239f8a9cd5b85:0x3bc9fe23981ca599!8m2!3d38.3982973!4d-0.4336634',
    description:
      'Cerca de la playa, cerca de la montaña, cerca de Alicante, un ambiente tranquilo pero a la vez dinámico y con una amplia oferta de servicios. San Juan De Alicante, más conocido como Sant Joan D’ Alacant, es un municipio de la comunidad valenciana que destaca por la calidad de vida que disfrutan sus vecinos.<br><br>Situado a escasos 10 minutos del centro de Alicante, a 2 km de la espléndida playa de San Juan y con un clima envidiable Sant Joan nos ofrece ese entorno ideal que buscamos para vivir.<br><br>Aunque tiene una fuerte historia y tradición vinculada a la agricultura como centro neurálgico del Camp D’ Alacant en la actualidad la mayoría de su población (23.518 habitantes según el INE2018) está orientada principalmente al sector servicios.<br><br>Y no es de extrañar ya que además de su cercanía con Alicante y de la playa esta ciudad residencial dispone de dos de los grandes pilares sanitarios de la provincia como son el #hospitaluniversitario de Sant Joan D’Alacant y la #universidad Miguel Hernández (sin olvidarnos del prestigioso Instituto de Neurociencias de la UMH).<br><br>Como si todo esto fuera poco también destacamos la cantidad de comercios, servicios de ocio y restauración que nos ofrece, donde solo hay que darse una vuelta por el centro para comprobarlo. Es igualmente destacable el ambiente que se forman en los mercadillos de C/ Mercado o el de Benimagrell (carretera Valencia, 22).<br><br>Sobre la gastronomía local destacamos el arroz a la alicantina, el arroz con cebolla y la olleta. En cualquier de sus numerosos restaurantes podrás degustar grandes recetas.<br><br>Con unas características tan especiales no es de extrañar que entren sus vecinos más ilustres se encuentren el novelista y dramaturgo Benito Pérez Galdós o el poeta Ramón de Campoamor.',
    employees: [],
  },
  {
    id: 'torrevieja-playa-del-cura',
    name: 'Torrevieja Playa del Cura',
    address: 'Av. de las Habaneras, 70',
    postalCode: '03182',
    city: 'Torrevieja',
    country: 'España',
    phone: '(+34) 601 408 940',
    imageUrl: 'torrevieja_playa_del_cura/office_outside.jpeg',
    lat: 37.9803418,
    long: -0.6842526,
    mapUrl:
      'https://www.google.com/maps/place/N%C3%BAcleo+Gestiones+Inmobiliarias/@37.9803418,-0.6842526,14z/data=!4m8!1m2!2m1!1sinmobiliaria+nucleo+Torrevieja!3m4!1s0xd63abc8a55b56f7:0xe582b3ae7d50867c!8m2!3d37.9803418!4d-0.6667431',
    description:
      'Les presentamos una de los mejores zonas de Torrevieja, la Playa del Cura. Destaca por supuesto su maravillosa playa, la que pone nombre al barrio, el Cura, de arena blanca y aguas cristalinas, donde poder disfrutar prácticamente todo el año gracias a las buenas temperaturas que ofrece la zona. Por otro lado, tenemos la fabulosa Curva del Palangre, una pequeña calita que mezcla arena y roca y que desemboca en la famosa Playa de los Locos. En definitiva, 3 playas a las que poder ir a pie en un máximo de 10 minutos desde cualquier vivienda de este maravilloso barrio.<br><br>También cabe destacar el gran número de servicios que ofrece Playa del Cura, donde se encuentra, por ejemplo, la Avenida de las Habaneras, la arteria del barrio y nexo con el centro de la ciudad, donde encontraremos todo tipo de comercios, bares y restaurantes, supermercados, farmacias, entidades de crédito, etc.<br><br>En definitiva una zona maravillosa donde encontrar todo lo que necesitas al alcanze de tu mano y donde podrer disfrutar de largos períodos vacacionales o bien, de vivir todo el año.',
    employees: [
      {
        name: 'Pablo Ortiz',
        position: 'MANAGER',
        imageUrl: 'torrevieja_playa_del_cura/pablo_ortiz.jpeg',
      },
      {
        name: 'José Luis Morón',
        position: 'ADVISOR',
        imageUrl: 'torrevieja_playa_del_cura/jose_luis_moron.jpeg',
      },
      {
        name: 'Gisela Cuevas',
        position: 'ADVISOR_F',
        imageUrl: 'torrevieja_playa_del_cura/gisela_cuevas.jpeg',
      },
      {
        name: 'Adrián Gil',
        position: 'ADVISOR',
        imageUrl: 'torrevieja_playa_del_cura/adrian_gil.jpeg',
      },
    ],
  },
];

export const getOffices = (): IOffice[] => {
  return offices;
};
