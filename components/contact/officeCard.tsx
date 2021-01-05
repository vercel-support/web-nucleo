import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
  className?: string;
};

const StyledAnchor = styled.a`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const StyledRow = styled(Row)`
  height: 100%;
`;

const Image = styled.div<{ imageUrl: string }>`
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: ${(props) =>
    props.theme.loadOptimizedImage(props.imageUrl)};
  height: 100%;
`;

const InfoContainer = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.breakpoints.lgd} {
    font-size: 14px;
  }
`;

const OfficeCard: React.FC<Props> = ({ office, className }) => {
  return (
    <div className={className}>
      <Link href={`/oficinas/${office.id}`} passHref>
        <StyledAnchor>
          <StyledRow>
            <Col flex="80px" style={{ alignSelf: 'stretch' }}>
              <Image imageUrl={office.imageUrl} />
            </Col>
            <Col flex="auto" style={{ alignSelf: 'center' }}>
              <InfoContainer>
                <Title>{office.name}</Title>
              </InfoContainer>
            </Col>
          </StyledRow>
        </StyledAnchor>
      </Link>
    </div>
  );
};

export default styled(OfficeCard)`
  height: 80px;
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
`;
