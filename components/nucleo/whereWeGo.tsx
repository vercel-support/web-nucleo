import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';
import TextSection from './textSection';

const TangramHouse = styled.div`
  position: absolute;
  right: ${(props) => props.theme.grid.getGridColumns(2)};
  bottom: 0;

  transform: translateY(-30px);

  height: 100%;
  width: ${(props) => props.theme.grid.getGridColumns(6)};

  background-image: url(/images/tangram_house.svg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom;
`;

const TangramBase = styled.div`
  position: absolute;
  right: ${(props) => props.theme.grid.getGridColumns(1)};
  bottom: 30px;

  width: 100%;
  height: 100px;
  @media ${(props) => props.theme.breakpoints.sm} {
    height: 20px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    height: 10px;
  }
  transform: translateY(100%);

  background-image: url(/images/tangram_base.svg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
`;

const Background = styled.div`
  position: relative;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: ${(props) => props.theme.grid.getGridColumns(2)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(9)};
  padding-top: 18px;
  padding-bottom: 48px;

  overflow: hidden;

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
    min-height: 300px;
    padding-bottom: 68px;
  }
`;

const WhereWeGo = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <TextSection
        title={i18n.t('aboutUs.section-3-title')}
        content={i18n.t('aboutUs.section-3-text')}
        titleStyle={{ marginRight: '-80px' }}
      />
      <TangramHouse />
      <TangramBase />
    </Background>
  );
};

export default WhereWeGo;
