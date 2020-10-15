import React from 'react';
import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  openSearch: boolean;
  query: string;
  hasFilters: boolean;
  resultsCount: number;
  className?: string;
};

const MainText = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Title: React.FC<Props> = ({
  openSearch,
  query,
  hasFilters,
  resultsCount,
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
      <div>
        {hasFilters
          ? i18n.t('search.subtitle.filters', { resultsCount })
          : i18n.t('search.subtitle.noFilters', { resultsCount })}
      </div>
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
