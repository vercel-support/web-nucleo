import React from 'react';
import styled from 'styled-components';
import { Row, Col, Select } from 'antd';

import { FlatOrderBy } from '../../common/model/enums/flatOrderBy.enum';
import useI18n from '../../common/hooks/useI18n';

type Props = {
  openSearch: boolean;
  query: string;
  resultsCount: number;
  orderBy: string;
  onOrderByChange: (orderBy: string) => void;
  className?: string;
};

const MainText = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const StyledRow = styled(Row)`
  font-size: 14px;
  line-height: 18px;
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 12px;
    line-height: 16px;
  }

  .ant-select {
    font-size: 14px;
    line-height: 18px;
    @media ${(props) => props.theme.breakpoints.xs} {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

const Title: React.FC<Props> = ({
  openSearch,
  query,
  resultsCount,
  orderBy,
  onOrderByChange,
  className,
}): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <MainText>
        {openSearch
          ? i18n.t('search.title.open', { query })
          : i18n.t('search.title.closed', { query })}
      </MainText>
      <StyledRow align="middle" justify="space-between">
        <Col style={{ maxWidth: '66%' }}>
          <span>
            {resultsCount > 1
              ? i18n.t('search.subtitle.plural', { resultsCount })
              : i18n.t('search.subtitle.singular', { resultsCount })}
          </span>
        </Col>
        <Col>
          <Select
            value={orderBy}
            bordered={false}
            dropdownMatchSelectWidth={false}
            onChange={(value) => onOrderByChange(value)}
          >
            <Select.Option value={FlatOrderBy.PRICE_ASC}>
              {i18n.t(`enums.flatOrderBy.${FlatOrderBy.PRICE_ASC}`)}
            </Select.Option>
            <Select.Option value={FlatOrderBy.PRICE_DESC}>
              {i18n.t(`enums.flatOrderBy.${FlatOrderBy.PRICE_DESC}`)}
            </Select.Option>
          </Select>
        </Col>
      </StyledRow>
    </div>
  );
};

export default styled(Title)`
  padding-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  margin-bottom: 2rem;
  @media ${(props) => props.theme.breakpoints.mdd} {
    padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
    padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  }
`;
