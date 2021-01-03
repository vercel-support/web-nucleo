import React from 'react';
import { Row, Col } from 'antd';

import { IOffice } from '../../common/model/office.model';
import { EmployeeComponent } from './';

type Props = {
  office: IOffice;
  className?: string;
};

const TeamSection: React.FC<Props> = ({ office, className }) => {
  return (
    <div className={className}>
      <Row gutter={[32, 32]} justify="space-around">
        {office.employees.map((employee) => (
          <Col key={employee.name} xs={24} sm={12} lg={8} xl={6}>
            <EmployeeComponent employee={employee} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamSection;
