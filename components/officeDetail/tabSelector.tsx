import React from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  tabs: string[];
  selectedTabIndex: number;
  setSelectedTabIndex: (index: number) => void;
  className?: string;
  theme: DefaultTheme;
};

const ButtonsContainer = styled.div`
  width: 100%;
  display: inline-flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.font.p1}
  margin-bottom: 8px;
  transition: transform 0.3s ease-out;
`;

const TabButton = styled.p<{ isSelected: boolean }>`
  width: 100%;
  min-width: 192px;

  text-align: center;
  font-weight: ${(props) => (props.isSelected ? '600' : 'inherit')};
  cursor: pointer;
  @media ${(props) => props.theme.breakpoints.mdd} {
    min-width: 176px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    min-width: 144px;
  }
`;

const GreyLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 100%;
  @media ${(props) => props.theme.breakpoints.lgd} {
    width: 500%;
    margin-left: -250%;
  }
`;

const OrangeLine = styled.div<{
  nTabs: number;
  selectedTabIndex: number;
}>`
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: left 400ms;

  width: calc(100% / ${(props) => props.nTabs});
  left: calc(
    calc(100% / ${(props) => props.nTabs}) *
      ${(props) => props.selectedTabIndex}
  );
`;

const MenuDivider = styled(
  ({
    tabs,
    selectedTabIndex,
    showOrangeLine,
    className,
  }: {
    tabs: string[];
    selectedTabIndex: number;
    showOrangeLine: boolean;
    className?: string;
  }): JSX.Element => {
    return (
      <div className={className}>
        <GreyLine />
        {showOrangeLine ? (
          <OrangeLine nTabs={tabs.length} selectedTabIndex={selectedTabIndex} />
        ) : null}
      </div>
    );
  }
)`
  position: absolute;
  top: 28px;
  width: 100%;
`;

const Gradient = styled.div<{ right?: boolean }>`
  background: linear-gradient(
    to ${(props) => (props.right ? 'right' : 'left')},
    rgba(255, 255, 255, 0) 10.94%,
    #ffffff 79.69%
  );
  position: absolute;
  left: ${(props) => (props.right ? 'inherit' : 0)};
  right: ${(props) => (props.right ? 0 : 'inherit')};
  top: 0;
  height: 100%;
  width: 30%;
  pointer-events: none;
`;

const TabSelector: React.FC<Props> = ({
  tabs,
  selectedTabIndex,
  setSelectedTabIndex,
  className,
  theme,
}) => {
  const [containerRef, setContainerRef] = useState(undefined);
  const parentRef = useRef<HTMLDivElement>();
  const buttonRef = useRef<HTMLDivElement>();
  const [offset, setOffset] = useState(0);
  const isLgDown = useMediaQuery({ query: theme.breakpoints.lgd });

  useEffect(() => {
    handleTabClick(selectedTabIndex);
  });

  const handleTabClick = (index: number) => {
    if (isLgDown && buttonRef && containerRef && process.browser && window) {
      const buttonWidth = buttonRef.current.getBoundingClientRect().width;
      const parentStyle = window.getComputedStyle(parentRef.current);
      const leftMargin = parseInt(parentStyle.getPropertyValue('padding-left'));
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const newOffset =
        -buttonWidth * index - leftMargin + screenWidth / 2 - buttonWidth / 2;
      setOffset(newOffset);
    }
  };
  let offsetPost = offset;
  if (!isLgDown) {
    offsetPost = 0;
  }
  return (
    <div className={className} ref={parentRef}>
      <ButtonsContainer
        ref={(element) => {
          setContainerRef(element);
        }}
        style={{ transform: `translateX(${offsetPost}px)` }}
      >
        {tabs.map((tab, index) => {
          let isSelected = false;
          let btnRef = null;
          if (index == selectedTabIndex) {
            isSelected = true;
            btnRef = buttonRef;
          }
          return (
            <TabButton
              key={tab}
              isSelected={isSelected}
              onClick={() => {
                setSelectedTabIndex(index);
                handleTabClick(index);
              }}
              ref={btnRef}
            >
              {tab}
            </TabButton>
          );
        })}
        <MenuDivider
          tabs={tabs}
          selectedTabIndex={selectedTabIndex}
          showOrangeLine={!isLgDown}
        />
      </ButtonsContainer>
      {isLgDown ? <Gradient /> : null}
      {isLgDown ? <Gradient right /> : null}
    </div>
  );
};

export default withTheme(styled(TabSelector)`
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-bottom: 20px;
  overflow: hidden;
  position: relative;
`);
