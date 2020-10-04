import { useState } from 'react';
import styled from 'styled-components';
import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { ResultsSectionTwoColumns } from '../../components/shared';

type Props = {
  flats: IFlat[];
  className?: string;
};

const Title = styled.h2`
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
  border-radius: ${(props) => props.theme.borderRadius};
  width: 64px;
  margin-top: 24px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(242, 242, 242, 0) 0%,
    #f2f2f2 39.61%
  );
  height: 37vh;
  width: 100%;
`;

const ShowMore = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10vh;
  left: 0;
  cursor: pointer;
  ${(props) => props.theme.font.p1}
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.family};
  line-height: 100%;
  font-weight: 500;

  font-size: 38px;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 26px;
  }
`;

const OfficeFlatsSection = ({ flats, className }: Props): JSX.Element => {
  const [showAllFlats, setShowAllFlats] = useState(false);
  const i18n = useI18n();
  const flatsToShow = showAllFlats ? flats : flats.slice(0, 4);
  return (
    <div className={className}>
      <Title>{i18n.t('contact.flats.title')}</Title>
      <Divider />
      <ResultsSectionTwoColumns
        flats={flatsToShow}
        cardBackgroundColor="white"
      />
      {showAllFlats ? null : (
        <Gradient>
          <ShowMore
            onClick={() => {
              setShowAllFlats(true);
            }}
          >
            {i18n.t('contact.flats.showmore')}
          </ShowMore>
        </Gradient>
      )}
    </div>
  );
};

export default styled(OfficeFlatsSection)`
  margin-top: 64px;
  background-color: ${(props) => props.theme.colors.grey};
  padding-bottom: 54px;
  overflow: hidden;
  position: relative;
`;
