import { IFlat } from '../../common/model/flat.model';

type Props = {
  flats: IFlat[];
};

const ZonesDisplay = ({ flats }: Props): JSX.Element => {
  console.log(flats);
  return <div></div>;
};

export default ZonesDisplay;
