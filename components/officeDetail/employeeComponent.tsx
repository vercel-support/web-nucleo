import React from 'react';
import styled from 'styled-components';

import { IEmployee } from '../../common/model/employee.model';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  employee: IEmployee;
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

const Name = styled.div`
  margin-top: 24px;
  font-size: 20px;
  line-height: 27px;
  font-weight: 600;
`;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  width: 32px;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const Position = styled.div`
  font-size: 18px;
  line-height: 32px;
  @media ${(props) => props.theme.breakpoints.lgd} {
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    line-height: 22px;
  }
`;

const EmployeeComponent: React.FC<Props> = ({ employee, className }) => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Image imageUrl={employee.imageUrl} />
      <Name>{employee.name}</Name>
      <Divider />
      <Position>
        {i18n.t(`enums.employeePosition.${employee.position}`)}
      </Position>
    </div>
  );
};

export default styled(EmployeeComponent)`
  text-align: center;
`;
