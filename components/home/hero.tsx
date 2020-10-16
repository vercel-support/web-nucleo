import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { Button } from 'antd';

import { ISearchOption } from '../../common/model/searchOption.model';
import useI18n from '../../common/hooks/useI18n';
import { SearchBar } from '../../components/shared';

type Props = {
  autoCompleteValue: string;
  autoCompleteOptions: ISearchOption[];
  onAutoCompleteValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  theme: DefaultTheme;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  @media ${(props) => props.theme.breakpoints.smd} {
    flex-direction: column;
    justify-content: center;
  }
`;

const Title = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  @media ${(props) => props.theme.breakpoints.xxl} {
    margin-left: ${(props) => props.theme.grid.getGridColumns(1, 1)};
    margin-right: ${(props) => props.theme.grid.getGridColumns(1, 1)};
  }

  @media ${(props) => props.theme.breakpoints.smd} {
    background-color: ${(props) => props.theme.colors.grey};
    border-radius: 25px;
    opacity: 0.8;
    padding: 30px;
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TitleParagraph = styled.p<{ themeColor: string }>`
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
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    max-width: ${(props) => props.theme.grid.getGridColumns(18, 0)};
  }

  color: ${(props) => props.theme.colors.secondary};

  ${(props) => props.theme.font.p1}
`;

const FloatingArea = styled.div`
  position: relative;
  @media ${(props) => props.theme.breakpoints.smd} {
    width: ${(props) => props.theme.grid.getGridColumns(20, 0)};
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
  }
  @media ${(props) => props.theme.breakpoints.mdu} {
    min-width: 660px;
    -ms-transform: translateY(50%);
    transform: translateY(50%);
    position: absolute;
    margin: auto auto;
    height: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: ${(props) => props.theme.grid.getGridColumns(16, 0)};
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

const SellYourHouseComponent = styled.div<{ openTextBar: boolean }>`
  position: absolute;
  top: 0;
  left: 66.67%;
  right: 1px;
  z-index: 100;
  @media ${(props) => props.theme.breakpoints.mdu} {
    min-width: 220px;
    transform: ${(props) =>
      props.openTextBar ? 'translateX(0)' : 'translateX(-80px)'};
    transition: transform 0.4s ease-out;
    -webkit-transition: transform 0.4s ease-out;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    top: 56px;
    left: 0;
  }
`;

const BuyYourHouseComponent = styled.div<{ openTextBar: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 66.67%;
  z-index: 200;
  @media ${(props) => props.theme.breakpoints.mdu} {
    min-width: 220px;
    transform: ${(props) =>
      props.openTextBar ? 'translateX(0)' : 'translateX(80px)'};
    transition: transform 0.4s ease-out;
    -webkit-transition: transform 0.4s ease-out;
  }
  @media ${(props) => props.theme.breakpoints.smd} {
    right: ${(props) => (props.openTextBar ? '100%' : '0')};
    transition: right 0.4s ease-out;
    -webkit-transition: right 0.4s ease-out;
    overflow: hidden;
  }
`;

const SearchBarContainer = styled.div<{ open: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 150;
  @media ${(props) => props.theme.breakpoints.mdu} {
    right: ${(props) => (props.open ? '0' : '100%')};
    transition: right 0.4s ease-out, transform 0.4s ease-out;
    -webkit-transition: right 0.4s ease-out, transform 0.4s ease-out;
    margin-top: -2px;
    transform: ${(props) =>
      props.open ? 'translateX(0)' : 'translateX(80px)'};
  }
`;

const ActionButton = styled(Button)<{ themeColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;

  color: white;
  background-color: ${(props) => props.theme.colors[props.themeColor]};
  border-color: ${(props) => props.theme.colors[props.themeColor]};

  &:hover {
    border-color: ${(props) => props.theme.colors[props.themeColor]};
    color: ${(props) => props.theme.colors[props.themeColor]};
  }
  &:focus,
  &:active {
    color: white;
    background-color: ${(props) => props.theme.colors[props.themeColor]};
    border-color: ${(props) => props.theme.colors[props.themeColor]};
  }
  border-radius: 40px;
  height: 44px;

  padding: 0 30px;
`;

const Hero = ({
  autoCompleteValue,
  autoCompleteOptions,
  onAutoCompleteValueChange,
  onSearch,
  theme,
}: Props): JSX.Element => {
  const i18n = useI18n();

  const isMdu = !useMediaQuery({ query: theme.breakpoints.smd });

  const autoCompleteRef = useRef(null);

  const [openTextBar, setOpenTextBar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {isMounted && (
        <FloatingArea>
          <div
            onClick={() => {
              if (!openTextBar) {
                if (autoCompleteRef.current) {
                  autoCompleteRef.current.focus();
                }
                setTimeout(() => setOpenTextBar(true), 100);
              }
            }}
            onBlur={() => {
              if (openTextBar) {
                setTimeout(() => setOpenTextBar(false), 100);
              }
            }}
          >
            <SearchBarContainer open={openTextBar}>
              <SearchBar
                height={isMdu ? '48px' : '44px'}
                value={autoCompleteValue}
                options={autoCompleteOptions}
                onValueChange={onAutoCompleteValueChange}
                buttonBackgroundColor={theme.colors.secondary}
                inputPadding={
                  isMdu && openTextBar ? 'calc(max(220px, 36%))' : undefined
                }
                ref={autoCompleteRef}
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
            </SearchBarContainer>
            <BuyYourHouseComponent openTextBar={openTextBar}>
              <ActionButton themeColor="secondary">
                {i18n.t('home.comprar')}
              </ActionButton>
            </BuyYourHouseComponent>
          </div>
          <SellYourHouseComponent openTextBar={openTextBar}>
            <Link href="/vender-casa" passHref>
              <ActionButton themeColor="primary">
                {i18n.t('home.vender')}
              </ActionButton>
            </Link>
          </SellYourHouseComponent>
        </FloatingArea>
      )}
    </Background>
  );
};

export default withTheme(Hero);
