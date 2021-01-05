import React from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { IOffice } from '../../common/model/office.model';
import useI18n from '../../common/hooks/useI18n';
import { OfficeCard } from './';

type Props = {
  offices: IOffice[];
  className?: string;
  theme: DefaultTheme;
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

const OfficesRowContainer = styled.div`
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-top: 32px;
  padding-bottom: 32px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const OfficesSection: React.FC<Props> = ({ offices, className, theme }) => {
  const i18n = useI18n();
  const isXlu = useMediaQuery({ query: theme.breakpoints.xlu });

  const colsPerRow = isXlu ? 3 : 2;
  const firstRowsSpan = 24 / colsPerRow;
  const colsInLastRow = offices.length % colsPerRow;
  const lastRowIndex = offices.length - colsInLastRow;
  const lastRowSpan = 24 / colsInLastRow;

  return (
    <div className={className}>
      <Title>{i18n.t('contact.offices.title')}</Title>
      <Divider />
      <OfficesRowContainer>
        <StyledRow gutter={[32, 32]}>
          {offices.slice(0, lastRowIndex).map((office) => (
            <Col key={office.id} xs={24} md={firstRowsSpan}>
              <OfficeCard office={office} />
            </Col>
          ))}
        </StyledRow>
        <StyledRow gutter={[32, 32]}>
          {offices.slice(lastRowIndex).map((office) => (
            <Col key={office.id} xs={24} md={lastRowSpan}>
              <OfficeCard office={office} />
            </Col>
          ))}
        </StyledRow>
      </OfficesRowContainer>
    </div>
  );
};

export default withTheme(styled(OfficesSection)`
  margin-top: 64px;
  background-color: white;
  padding-top: 56px;
`);
