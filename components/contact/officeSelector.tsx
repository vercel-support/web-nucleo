import { IOffice } from '../../common/model/office.model';
import styled from 'styled-components';
import { Swipeable } from 'react-swipeable';
import { useState, useRef } from 'react';

type Props = {
  offices: IOffice[];
  selectedOfficeIndex: number;
  setSelectedOffice: (officeIndex: number) => void;
  className?: string;
};

const ButtonsContainer = styled(Swipeable)`
  display: inline-flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.font.p1}
  margin-bottom: 8px;
`;

const OfficeButton = styled.p<{ isSelected: boolean }>`
  width: ${(props) => props.theme.grid.getGridColumns(4, 0)};
  min-width: 194px;

  text-align: center;
  font-weight: ${(props) => (props.isSelected ? '500' : 'inherit')};
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
  }: {
    offices: IOffice[];
    selectedOfficeIndex: number;
    className?: string;
  }): JSX.Element => {
    return (
      <div className={className}>
        <GreyLine />
        <OrangeLine
          nOffices={offices.length}
          selectedOfficeIndex={selectedOfficeIndex}
        />
      </div>
    );
  }
)`
  position: absolute;
  top: 28px;
  width: 100%;
`;

const OfficeSelector = ({
  offices,
  selectedOfficeIndex,
  setSelectedOffice,
  className,
}: Props): JSX.Element => {
  const [containerRef, setContainerRef] = useState(undefined);
  const parentRef = useRef<HTMLDivElement>();
  const [offset, setOffset] = useState(0);
  const [baseOffset_, setBaseOffset] = useState(0);
  let baseOffset = baseOffset_;

  const config = {
    delta: 2, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true, // preventDefault on touchmove
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };

  const handleMove = (eventData) => {
    if (containerRef && process.browser && window) {
      if (eventData.first) {
        setBaseOffset(offset);
        baseOffset = offset;
      }
      const newOffset = baseOffset + eventData.deltaX;
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const parentStyle = window.getComputedStyle(parentRef.current);
      const totalMargins =
        parseInt(parentStyle.getPropertyValue('margin-left')) +
        parseInt(parentStyle.getPropertyValue('margin-right'));
      const containerWidth = containerRef.getBoundingClientRect().width;
      if (
        newOffset >= 0 &&
        newOffset <= containerWidth + totalMargins - screenWidth
      ) {
        setOffset(newOffset);
      }
    }
  };

  const handleOfficeClick = (index) => {
    if (containerRef && process.browser && window) {
        const buttonWidth = 194;
        const parentStyle = window.getComputedStyle(parentRef.current);
        const leftMargin = parseInt(parentStyle.getPropertyValue('margin-left'));
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const newOffset = -buttonWidth * index - leftMargin + screenWidth/2 - buttonWidth/2;
        setOffset(newOffset);
    }
  }

  return (
    <div className={className} ref={parentRef}>
      <ButtonsContainer
        innerRef={(element) => {
          setContainerRef(element);
        }}
        style={{ transform: `translateX(${offset}px)` }}
        {...config}
      >
        {offices.map((office, index) => {
          let isSelected = false;
          if (index == selectedOfficeIndex) {
            isSelected = true;
          }
          return (
            <OfficeButton
              key={office.id}
              isSelected={isSelected}
              onClick={() => {
                setSelectedOffice(index);
                handleOfficeClick(index);
              }}
            >
              {office.shortName}
            </OfficeButton>
          );
        })}
        <MenuDivider
          offices={offices}
          selectedOfficeIndex={selectedOfficeIndex}
        />
      </ButtonsContainer>
    </div>
  );
};

export default styled(OfficeSelector)`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-bottom: 20px;
`;
