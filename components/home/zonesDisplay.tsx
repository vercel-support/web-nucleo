import styled from 'styled-components';
import useI18n from '../../common/hooks/useI18n';
import { IFlat } from '../../common/model/flat.model';

type Props = {
  flats: IFlat[];
};

const ZonesDisplay = ({ flats }: Props): JSX.Element => {
  const i18n = useI18n();

  return <div></div>;
};

export default ZonesDisplay;
