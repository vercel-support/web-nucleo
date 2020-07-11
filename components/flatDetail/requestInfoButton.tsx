import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Button } from 'antd';

import nextI18Next from '../../i18n';

const { withTranslation } = nextI18Next;

type Props = {
  className?: string;
} & WithTranslation;

const RequestInfoButton = ({ className, t }: Props): JSX.Element => {
  return (
    <Button className={className}>{t('flatDetail.actions.requestInfo')}</Button>
  );
};

export default styled(withTranslation('common')(RequestInfoButton))`
  height: 56px;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
`;
