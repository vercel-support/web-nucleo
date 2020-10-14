import React from 'react';
/* import Link from 'next/link'; */
import styled from 'styled-components';
/* import { Button } from 'antd'; */

import { ISearchOption } from '../../common/model/searchOption.model';
import useI18n from '../../common/hooks/useI18n';
import { SearchBar } from '../../components/shared';

type Props = {
  autoCompleteValue: string;
  autoCompleteOptions: ISearchOption[];
  onAutoCompleteValueChange: (value: string) => void;
  onSearch: (value: string) => void;
};

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
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }

  @media ${(props) => props.theme.breakpoints.lgu} {
    flex: 1;
  }
  @media ${(props) => props.theme.breakpoints.mdd} {
    background-color: ${(props) => props.theme.colors.grey};
    border-radius: 25px;
    opacity: 0.8;
    padding: 30px;
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TitleParagraph = styled.h1<{ themeColor: string }>`
  margin-top: 0;
  margin-bottom: 0;
  letter-spacing: 0em;
  color: ${(props) => props.theme.colors[props.themeColor]};

  ${(props) => props.theme.font.h1}
  @media ${(props) => props.theme.breakpoints.smd} {
    font-size: 26px;
  }
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
  @media ${(props) => props.theme.breakpoints.smd} {
    margin-top: 18px;
    margin-bottom: 18px;
  }
`;

const Subtitle = styled.h2`
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
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}
`;

const FloatingSection = styled.div`
  position: absolute;
  margin: auto auto;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 99;

  -ms-transform: translateY(50%);
  transform: translateY(50%);

  @media ${(props) => props.theme.breakpoints.xs} {
    width: ${(props) => props.theme.grid.getGridColumns(20, 0)};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(16, 0)};
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    width: ${(props) => props.theme.grid.getGridColumns(14, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xlu} {
    width: ${(props) => props.theme.grid.getGridColumns(12, 0)};
  }
`;

/* const ActionButton = styled(Button)`
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
`; */

const Hero: React.FC<Props> = ({
  autoCompleteValue,
  autoCompleteOptions,
  onAutoCompleteValueChange,
  onSearch,
}) => {
  const i18n = useI18n();

  return (
    <Background>
      <Title>
        <TitleParagraph themeColor="secondary">
          {i18n.t('home.hero-title-1')}
        </TitleParagraph>
        <TitleParagraph themeColor="primary">
          {i18n.t('home.hero-title-2')}
        </TitleParagraph>
        <Divider />
        <Subtitle>{i18n.t('home.hero-subtitle')}</Subtitle>
      </Title>
      <FloatingSection>
        <SearchBar
          height="48px"
          value={autoCompleteValue}
          options={autoCompleteOptions}
          onValueChange={onAutoCompleteValueChange}
          onSearch={(value) => {
            if (!value) {
              return;
            }
            onSearch(value);
          }}
          onSelect={(option) => {
            onSearch(option.text);
          }}
        />
      </FloatingSection>
    </Background>
  );
};

export default Hero;
