import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  onClick: () => void;
  className?: string;
};

const ContactUsButton = ({ onClick, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <Row justify="center">
      <Col xs={20} md={10} lg={8} xl={6} xxl={4}>
        <Button
          className={className}
          onClick={(e) => {
            (e.target as HTMLButtonElement).blur();
            onClick();
          }}
        >
          {i18n.t('sellHouse.form.contactUs')}
        </Button>
      </Col>
    </Row>
  );
};

export default styled(ContactUsButton)`
  height: 56px;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
`;
