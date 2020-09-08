import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';
import TextSection from './textSection';

const TangramHeart = styled.div`
  position: absolute;
  left: ${(props) => props.theme.grid.getGridColumns(2)};
  top: 50%;

  transform: translateY(-50%);

  height: 100%;
  width: ${(props) => props.theme.grid.getGridColumns(6, 0)};

  background-image: url(/images/tangram_heart.svg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Background = styled.div`
  position: relative;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: ${(props) => props.theme.grid.getGridColumns(9)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2)};
  padding-top: 18px;
  padding-bottom: 18px;

  margin-top: 30px;
  @media ${(props) => props.theme.breakpoints.xxl} {
    min-height: 500px;
  }
  @media ${(props) => props.theme.breakpoints.xld} {
    min-height: 400px;
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    min-height: 300px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    min-height: 280px;
  }
`;

const WhereWeFrom = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <TextSection
        title={i18n.t('aboutUs.section-2-title')}
        content={i18n.t('aboutUs.section-2-text')}
        right
        titleStyle={{ marginLeft: '-80px' }}
      />
      <TangramHeart />
    </Background>
  );
};

export default WhereWeFrom;
