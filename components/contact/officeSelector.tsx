import { IOffice } from '../../common/model/office.model';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  offices: IOffice[];
  selectedOfficeIndex: number;
  setSelectedOffice: (officeIndex: number) => void;
  className?: string;
  theme: DefaultTheme;
};

const ButtonsContainer = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.font.p1}
  margin-bottom: 8px;
  transition: transform 0.3s ease-out;
`;

const OfficeButton = styled.p<{ isSelected: boolean }>`
  width: ${(props) => props.theme.grid.getGridColumns(4, 0)};
  min-width: 194px;

  text-align: center;
  font-weight: ${(props) => (props.isSelected ? '600' : 'inherit')};
  cursor: pointer;
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
  nOffices: number;
  selectedOfficeIndex: number;
}>`
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: left 400ms;

  width: calc(100% / ${(props) => props.nOffices});
  left: calc(
    calc(100% / ${(props) => props.nOffices}) *
      ${(props) => props.selectedOfficeIndex}
  );
`;

const MenuDivider = styled(
  ({
    offices,
    selectedOfficeIndex,
    className,
    showOrangeLine,
  }: {
    offices: IOffice[];
    selectedOfficeIndex: number;
    className?: string;
    showOrangeLine: boolean;
  }): JSX.Element => {
    return (
      <div className={className}>
        <GreyLine />
        {showOrangeLine ? (
          <OrangeLine
            nOffices={offices.length}
            selectedOfficeIndex={selectedOfficeIndex}
          />
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

const OfficeSelector = ({
  offices,
  selectedOfficeIndex,
  setSelectedOffice,
  className,
  theme,
}: Props): JSX.Element => {
  const [containerRef, setContainerRef] = useState(undefined);
  const parentRef = useRef<HTMLDivElement>();
  const buttonRef = useRef<HTMLDivElement>();
  const [offset, setOffset] = useState(0);
  const isLgDown = useMediaQuery({ query: theme.breakpoints.lgd });

  useEffect(() => {
    handleOfficeClick(selectedOfficeIndex);
  });

  const handleOfficeClick = (index) => {
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
        {offices.map((office, index) => {
          let isSelected = false;
          let btnRef = null;
          if (index == selectedOfficeIndex) {
            isSelected = true;
            btnRef = buttonRef;
          }
          return (
            <OfficeButton
              key={office.id}
              isSelected={isSelected}
              onClick={() => {
                setSelectedOffice(index);
                handleOfficeClick(index);
              }}
              ref={btnRef}
            >
              {office.shortName}
            </OfficeButton>
          );
        })}
        <MenuDivider
          offices={offices}
          selectedOfficeIndex={selectedOfficeIndex}
          showOrangeLine={!isLgDown}
        />
      </ButtonsContainer>
      {isLgDown ? <Gradient /> : null}
      {isLgDown ? <Gradient right /> : null}
    </div>
  );
};

export default withTheme(styled(OfficeSelector)`
  padding-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-bottom: 20px;
  position: relative;
`);
