import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import nextI18Next from '../../i18n';
import Flat from '../../backend/salesforce/flat';

const { withTranslation } = nextI18Next;

type Props = {
  flat: Flat;
  className?: string;
} & WithTranslation;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.secondary};
`;

const Separator = styled.hr`
  border: 1px solid #f2f2f2;
  margin-bottom: 1rem;
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

const Description = ({ flat, className, t }: Props): JSX.Element => {
  return (
    <div className={className}>
      <Title>{t('flat.description')}</Title>
      <Separator />
      <Zone>{`${t('flat.zone')}: ${flat.zone}`}</Zone>
      <Info>{flat.description}</Info>
    </div>
  );
};

export default withTranslation('common')(Description);
