import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import useI18n from '../../common/hooks/useI18n';

const Background = styled.div`
  background-image: ${(props) =>
    props.theme.loadOptimizedImage('banner_hero.png')};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 55vh;
  min-height: 500px;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }
  width: 100%;
  margin-top: 50px;
  margin-bottom: 8px;
`;

const TitleParagraph = styled.p<{ themeColor: string }>`
  margin-top: 0;
  margin-bottom: 0;
  letter-spacing: 0em;
  color: ${(props) => props.theme.colors[props.themeColor]};

  ${(props) => props.theme.font.h1}
`;

const Divider = styled.hr`
  width: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: var(--gutter);
  margin-right: 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Subtitle = styled.h1`
  font-weight: bold;
  font-size: 24px;

  max-width: ${(props) => props.theme.grid.getGridColumns(7, 0)};

  @media ${(props) => props.theme.breakpoints.xl} {
    max-width: ${(props) => props.theme.grid.getGridColumns(9, 0)};
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}
`;

const ActionButtons = styled.div`
  position: absolute;
  margin: auto auto;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 99;
  display: flex;
  justify-content: center;

  -ms-transform: translateY(50%);
  transform: translateY(50%);

  @media ${(props) => props.theme.breakpoints.xs} {
    width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: ${(props) => props.theme.grid.getGridColumns(16, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(13, 0)};
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    width: ${(props) => props.theme.grid.getGridColumns(13, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    width: ${(props) => props.theme.grid.getGridColumns(11, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xxl} {
    width: ${(props) => props.theme.grid.getGridColumns(10, 0)};
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;

  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};

  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;

  @media ${(props) => props.theme.breakpoints.xs} {
    height: 47px;
    font-size: 16px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    height: 60px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    height: 65px;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    height: 68px;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    height: 70px;
  }
  @media ${(props) => props.theme.breakpoints.xxl} {
    height: 70px;
  }
`;

const Hero = (): JSX.Element => {
  const i18n = useI18n();

  return (
    <Background>
      <Title>
        <TitleParagraph themeColor="secondary">
          {i18n.t('hero-title-1')}
        </TitleParagraph>
        <TitleParagraph themeColor="primary">
          {i18n.t('hero-title-2')}
        </TitleParagraph>
        <Divider />
        <Subtitle>{i18n.t('hero-subtitle')}</Subtitle>
      </Title>
      <ActionButtons>
        <Link href="/vender-casa" passHref>
          <ActionButton>{i18n.t('vender')}</ActionButton>
        </Link>
      </ActionButtons>
    </Background>
  );
};
export default Hero;
