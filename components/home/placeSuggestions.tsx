import styled from 'styled-components';
import { ISuggestion } from '../../common/model/suggestion.model';
import useI18n from '../../common/hooks/useI18n';
import SuggestionCard from './suggestionCard';

type Props = {
  suggestions: ISuggestion[];
  className?: string;
};

const Title = styled.h3`
  ${(props) => props.theme.font.p1}
  margin-bottom: 12px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const PlaceSuggestions = ({ suggestions, className }: Props): JSX.Element => {
  const i18n = useI18n();
  return (
    <div className={className}>
      <Title>{i18n.t('home.suggestions.title')}</Title>
      <CardsContainer>
        {suggestions.map((suggestion) => {
          return (
            <SuggestionCard suggestion={suggestion} key={suggestion.query} />
          );
        })}
      </CardsContainer>
    </div>
  );
};

export default styled(PlaceSuggestions)`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${(props) => props.theme.breakpoints.mdd} {
    display: none;
  }
`;
