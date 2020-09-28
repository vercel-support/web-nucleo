import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';

type Props = {
  openSearch: boolean;
  query: string;
  className?: string;
};

const Text = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
`;

const Title = ({ openSearch, query, className }: Props): JSX.Element => {
  const i18n = useI18n();

  return (
    <div className={className}>
      <Text>
        {openSearch
          ? i18n.t('search.title.open', { query })
          : i18n.t('search.title.closed', { query })}
      </Text>
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
