import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IOffice } from '../../common/model/office.model';
import useI18n from '../../common/hooks/useI18n';
import { OfficeDetail } from '.';

type Props = {
  offices: IOffice[];
  className?: string;
};

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 38px !important;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px !important;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 26px !important;
  }
`;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 64px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding: 64px;
  @media ${(props) => props.theme.breakpoints.mdd} {
    padding: 40px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 32px;
  }
`;

const CardRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const ContactFormSection = ({ offices, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Title>{i18n.t('contact.offices.title')}</Title>
      <Divider />
      <Card>
        <CardRow gutter={[24, 32]}>
          {offices.map((office) => (
            <Col key={office.id} xs={24} xl={12}>
              <OfficeDetail office={office} />
            </Col>
          ))}
        </CardRow>
      </Card>
    </div>
  );
};

export default styled(ContactFormSection)`
  margin-top: 64px;
`;
