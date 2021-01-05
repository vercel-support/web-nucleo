import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { OfficeMap } from './';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
  className?: string;
};

const Image = styled.div<{ imageUrl: string }>`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage(props.imageUrl)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin-left: auto;
  margin-right: auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  @media ${(props) => props.theme.breakpoints.xs} {
    height: 100px;
    width: 100px;
  }
`;

const InfoContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const InfoTitle = styled.div`
  font-size: 20px;
  line-height: 27px;
  font-weight: 600;
`;

const InfoDivider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  width: 32px;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const InfoDescription = styled.div`
  font-size: 18px;
  line-height: 32px;
  @media ${(props) => props.theme.breakpoints.lgd} {
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    line-height: 22px;
  }
`;

const InformationSection: React.FC<Props> = ({ office, className }) => {
  return (
    <div className={className}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={8} style={{ alignSelf: 'center' }}>
          <Image imageUrl={office.imageUrl} />
          <InfoContainer>
            <InfoTitle>{office.name}</InfoTitle>
            <InfoDivider />
            <InfoDescription>
              <div>{office.address}</div>
              <div>{`${office.postalCode} ${office.city}`}</div>
              <div>
                <a href={`tel:${office.phone}`}>{office.phone}</a>
              </div>
            </InfoDescription>
          </InfoContainer>
        </Col>
        <Col xs={24} lg={16}>
          <OfficeMap office={office} />
        </Col>
      </Row>
    </div>
  );
};

export default InformationSection;
