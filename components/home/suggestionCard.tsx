import styled from 'styled-components';
import useI18n from '../../common/hooks/useI18n';
import { ISuggestion } from '../../common/model/suggestion.model';
import Link from 'next/link';

type Props = {
  suggestion: ISuggestion;
  className?: string;
};

const SuggestionTitle = styled.div`
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

const SuggestionLink = styled.div`
  color: white;
  font-weight: normal;
  font-size: 16px;
`;

const Container = styled.div<{
  picturePath: string;
}>`
  -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex: 1;
  margin-top: 12px;
  margin-bottom: 12px;
  max-width: 400px;
  cursor: pointer;
  background-image: url(${(props) => props.picturePath});
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
`;

const SuggestionCard = ({ suggestion, className }: Props): JSX.Element => {
  const i18n = useI18n();
  return (
    <Link
      href={{
        pathname: '/buscar',
        query: { q: encodeURIComponent(suggestion.query) },
      }}
      passHref
    >
      <Container picturePath={suggestion.picturePath} className={className}>
        <SuggestionTitle>{suggestion.title}</SuggestionTitle>
        <SuggestionLink>{i18n.t('home.suggestions.buttonText')}</SuggestionLink>
      </Container>
    </Link>
  );
};

export default SuggestionCard;
