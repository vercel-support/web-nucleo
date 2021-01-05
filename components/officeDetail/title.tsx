import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  className?: string;
};

const Text = styled.h2`
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
  width: 64px;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
`;

const Title: React.FC<Props> = ({ text, className }) => {
  return (
    <div className={className}>
      <Text>{text}</Text>
      <Divider />
    </div>
  );
};

export default styled(Title)`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-bottom: 32px;
`;
