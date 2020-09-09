import { Fragment } from 'react';
import styled from 'styled-components';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  flat: IFlat;
};

const Title = styled.h2`
  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const Divider = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #e0e0e0;
  background-color: #e0e0e0;
`;

const Zone = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 30px;
`;

const Info = styled.div`
  font-size: 14px;
  line-height: 30px;
`;

const Description = ({ flat }: Props): JSX.Element => {
  const i18n = useI18n();

  function computeDescription(): string {
    switch (i18n.activeLocale) {
      case 'en':
        return flat.description_EN;
      default:
        return flat.description_ES;
    }
  }

  return (
    <Fragment>
      <Title>{i18n.t('flat.description')}</Title>
      <Divider />
      <Zone>{`${i18n.t('flat.zone')}: ${flat.zone}`}</Zone>
      <Info dangerouslySetInnerHTML={{ __html: computeDescription() }} />
    </Fragment>
  );
};

export default Description;
