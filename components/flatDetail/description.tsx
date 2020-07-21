import { Fragment } from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
} & WithTranslation;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.h2}
`;

const Divider = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #e0e0e0;
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

const Description = ({ flat, t, i18n }: Props): JSX.Element => {
  let description: string = null;
  switch (i18n.language) {
    case 'es':
      description = flat.description_ES;
      break;
    case 'en':
      description = flat.description_ES;
      break;
  }
  return (
    <Fragment>
      <Title>{t('flat.description')}</Title>
      <Divider />
      <Zone>{`${t('flat.zone')}: ${flat.zone}`}</Zone>
      <Info dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
};

export default withTranslation('common')(Description);
