import styled from 'styled-components';
import { ISuggestion } from '../../common/model/suggestion.model';
import useI18n from '../../common/hooks/useI18n';
import SuggestionCard from './suggestionCard';

type Props = {
  suggestions: ISuggestion[];
  className?: string;
};

const Title = styled.h3`
  ${(props) => props.theme.font.h2}
  @media ${(props) => props.theme.breakpoints.lgu} {
    ${(props) => props.theme.font.p1}
    margin-top: 70px;
    margin-left: 7px;
  }
  margin-bottom: 12px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  @media ${(props) => props.theme.breakpoints.mdd} {
    align-items: center;
  }
  @media ${(props) => props.theme.breakpoints.lgu} {
    margin-bottom: 80px;
  }
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
`;
