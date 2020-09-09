import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
};

const ImageContainer = styled.div`
  @media ${(props) => props.theme.breakpoints.xxl} {
    height: 98px;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    height: 91px;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    height: 88px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    height: 77px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    height: 67px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    height: 56px;
  }
`;

const ImageFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
        <ImageContainer>
          <ImageFlexContainer>
            <Image src={office.imageUrl} alt={office.name} />
          </ImageFlexContainer>
        </ImageContainer>
      </Col>
      <Col>
        <Text>
          <BoldText>{office.name}</BoldText>
          <div>{office.address}</div>
          <div>
            ({office.postalCode}) {office.city}
          </div>
          <div>{office.phone}</div>
        </Text>
      </Col>
    </Row>
  );
};

export default ContactFormSection;
