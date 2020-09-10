import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
};

const Image = styled.div<{ imageUrl: string }>`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 50.43%,
      #ffffff 100%
    ),
    linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 50.43%),
    url(${(props) => props.imageUrl});
  @media ${(props) => props.theme.breakpoints.xxl} {
    height: 98px;
    width: 98px;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    height: 91px;
    width: 91px;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    height: 88px;
    width: 88px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    height: 77px;
    width: 77px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    height: 67px;
    width: 67px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    height: 56px;
    width: 56px;
  }
`;

const Text = styled.div`
  ${(props) => props.theme.font.p1}
  color: ${(props) => props.theme.colors.secondary};
`;

const BoldText = styled.div`
  font-weight: 600;
`;

const ContactFormSection = ({ office }: Props): JSX.Element => {
  return (
    <Row gutter={{ xs: 16, sm: 20, md: 24, lg: 32 }} align={'middle'}>
      <Col>
        <Image imageUrl={office.imageUrl} />
      </Col>
      <Col>
        <Text>
          <BoldText>{office.name}</BoldText>
          <div>{office.address}</div>
          <div>
            {office.postalCode} {office.city}
          </div>
          <div>{office.phone}</div>
        </Text>
      </Col>
    </Row>
  );
};

export default ContactFormSection;
