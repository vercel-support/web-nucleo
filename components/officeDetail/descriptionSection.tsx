import React from 'react';
import styled from 'styled-components';

import { IOffice } from '../../common/model/office.model';

type Props = {
  office: IOffice;
  className?: string;
};

const Text = styled.div`
  ${(props) => props.theme.font.p1}
`;

const DescriptionSection: React.FC<Props> = ({ office, className }) => {
  return (
    <div className={className}>
      <Text
        key={Math.random()}
        dangerouslySetInnerHTML={{
          __html: office.description,
        }}
      />
    </div>
  );
};

export default styled(DescriptionSection)`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  text-align: center;
  @media ${(props) => props.theme.breakpoints.xxl} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    margin-left: 0;
    margin-right: 0;
  }
`;
