import styled from 'styled-components';
import { useState } from 'react';
import { IZone } from '../../common/model/zone.model';
import { SvgLoader, SvgProxy } from 'react-svgmt';

type Props = {
  zones: IZone[];
};

const SVGContainer = styled.div<{
  animationEnabled: boolean;
  phaseTwoStartPercentage: number;
  animationDuration: number;
}>`
  & .text {
    pointer-events: none;
  }

  @keyframes example {
    0% {
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.35, 0, 1, 0.59);
    }
    ${(props) => props.phaseTwoStartPercentage}% {
      transform: scale(2);
      animation-timing-function: linear;
    }
    ${(props) => props.phaseTwoStartPercentage}.001% {
      transform: scale(0);
      animation-timing-function: cubic-bezier(0, 0.35, 0.59, 1);
    }
    100% {
      transform: scale(1);
      animation-timing-function: linear;
    }
  }

  & svg {
    animation-name: ${(props) => (props.animationEnabled ? 'example' : 'none')};
    animation-duration: ${(props) => props.animationDuration}ms;
  }
  & .zone path:hover {
    fill: ${(props) => props.theme.colors.secondary} !important;
  }
`;

const HierarchicalMap = ({ zones }: Props): JSX.Element => {
  const [currentMapId, setCurrentMapId] = useState('0');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const phaseTwoStartPercentage = 35;
  const animationDuration = 500;

  const pauseAnimation = () => {
    setAnimationEnabled(false);
  };

  const configureSVGZones = (svgElements: SVGGeometryElement[]) => {
    for (const svgElement of svgElements) {
      const elementId = svgElement.id;
      if (!(elementId in zones)) {
        console.log(`WARNING: ${elementId} missing from zones definition`);
        continue;
      }

      const zone: IZone = zones[elementId];
      const paths = svgElement.querySelectorAll('path');
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (zone.hasFlats) {
          path.style.fill = '#EF7048';
        } else {
          path.style.fill = '#EF9981';
        }
      }

      svgElement.addEventListener('click', () => {
        console.log(elementId);
        console.log(zone);

        if (zone.url && zone.hasFlats) {
          setAnimationEnabled(true);
          setTimeout(() => {
            setCurrentMapId(elementId);
          }, (animationDuration * phaseTwoStartPercentage) / 100);
        } else if (zone.hasFlats) {
          console.log('TODO: redirect to search with the current map id set');
        } else {
          console.log('Zone selected has no flats');
        }
      });
    }
  };

  return (
    <SVGContainer
      animationEnabled={animationEnabled}
      onAnimationEnd={pauseAnimation}
      phaseTwoStartPercentage={phaseTwoStartPercentage}
      animationDuration={animationDuration}
    >
      <SvgLoader width="600" height="600" path={zones[currentMapId].url}>
        <SvgProxy selector=".zone" onElementSelected={configureSVGZones} />
      </SvgLoader>
    </SVGContainer>
  );
};

export default HierarchicalMap;
