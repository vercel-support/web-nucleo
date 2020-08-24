import styled from 'styled-components';

import useI18n from '../../common/hooks/useI18n';
import TextSection from './textSection';

const TangramStar = styled.div`
  position: absolute;
  @media ${(props) => props.theme.breakpoints.xxl} {
    right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    height: ${(props) => props.theme.grid.getGridColumns(3, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(3, 0)};
    top: 0;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    height: ${(props) => props.theme.grid.getGridColumns(4, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(4, 0)};
    top: 0;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    height: ${(props) => props.theme.grid.getGridColumns(5, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(5, 0)};
    right: ${(props) => props.theme.grid.getGridColumns(4, 1)};
    top: 40px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    height: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    top: 35px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    height: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    top: 35px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    height: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(6, 0)};
    right: ${(props) => props.theme.grid.getGridColumns(3, 1)};
    top: 45px;
  }

  background-image: url(/images/tangram_star.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
`;

const TangramMountain = styled.div`
  position: absolute;

  bottom: 0;
  height: 100%;

  @media ${(props) => props.theme.breakpoints.xxl} {
    left: ${(props) => props.theme.grid.getGridColumns(17, 1)};
    width: ${(props) => props.theme.grid.getGridColumns(10)};
    transform: translateY(20%);
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    left: ${(props) => props.theme.grid.getGridColumns(16, 1)};
    width: ${(props) => props.theme.grid.getGridColumns(13)};
    transform: translateY(20%);
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    left: ${(props) => props.theme.grid.getGridColumns(14, 1)};
    width: ${(props) => props.theme.grid.getGridColumns(16)};
    transform: translateY(17%);
  }
  @media ${(props) => props.theme.breakpoints.md} {
    left: ${(props) => props.theme.grid.getGridColumns(13, 1)};
    width: ${(props) => props.theme.grid.getGridColumns(20)};
    transform: translateY(15%);
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    left: ${(props) => props.theme.grid.getGridColumns(13, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(19)};
    transform: translateY(13%);
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    left: ${(props) => props.theme.grid.getGridColumns(13, 0)};
    width: ${(props) => props.theme.grid.getGridColumns(19)};
    transform: translateY(11%);
  }

  background-image: url(/images/tangram_mountain.svg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom;
`;

const Background = styled.div`
  position: relative;
  background-color: white;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: ${(props) => props.theme.grid.getGridColumns(2)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(9)};
  padding-top: 30px;
  padding-bottom: 30px;

  min-height: 500px;

  @media ${(props) => props.theme.breakpoints.sm} {
    min-height: 400px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    min-height: 380px;
  }
`;

const WhoAreWe = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <TextSection
        title={i18n.t('who-are-we.section-1-title')}
        content={i18n.t('who-are-we.section-1-text')}
        titleStyle={{ marginRight: '-80px' }}
      />
      <TangramStar />
      <TangramMountain />
    </Background>
  );
};

export default WhoAreWe;
