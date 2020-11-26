import styled from 'styled-components';
import { useState } from 'react';
import { IZone } from '../../common/model/zone.model';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { useRouter } from 'next/router';

type Props = {
  zones: Record<string, IZone>;
  className?: string;
};

const MapContainer = styled.div<{
  animationEnabled: boolean;
  phaseTwoStartPercentage: number;
  animationDuration: number;
}>`
  position: relative;
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

const BackButton = styled.img`
  position: absolute;
  cursor: pointer;
  top: 100px;
  left: 40px;
  height: 18px;
  width: 18px;
  color: ${(props) => props.theme.colors.secondary};
`;

const HierarchicalMap = ({ zones, className }: Props): JSX.Element => {
  const [currentMapId, _setCurrentMapId] = useState('0');
  const [stateHistory, setStateHistory] = useState([]);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const phaseTwoStartPercentage = 35;
  const animationDuration = 500;
  const router = useRouter();

  const setCurrentMapId = (nextId) => {
    if (nextId !== currentMapId) {
      setStateHistory([...stateHistory, currentMapId]);
    }
    return _setCurrentMapId(nextId);
  };

  const pauseAnimation = () => {
    setAnimationEnabled(false);
  };

  const onBackButtonClicked = () => {
    if (stateHistory.length > 0) {
      const nextId = stateHistory[stateHistory.length - 1];
      setStateHistory(stateHistory.slice(0, -1));
      _setCurrentMapId(nextId);
    }
  };

  const routeToSearch = (q: string) => {
    router.push({
      pathname: '/buscar',
      query: { q },
    });
  };

  const configureSVGZones = (svgElements: SVGGeometryElement[]) => {
    for (const svgElement of svgElements) {
      const elementId = svgElement.id;
      if (!(elementId in zones)) {
        console.log(`WARNING: ${elementId} missing from zones definition`);
        const paths = svgElement.querySelectorAll('path');
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          path.style.fill = '#EF9981';
        }
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
        if (zone.url && zone.hasFlats) {
          setAnimationEnabled(true);
          setTimeout(() => {
            setCurrentMapId(elementId);
          }, (animationDuration * phaseTwoStartPercentage) / 100);
        } else if (zone.hasFlats) {
          routeToSearch(elementId);
        } else {
          console.log('Zone selected has no flats');
        }
      });
    }
  };

  if (!(currentMapId in zones)) {
    setStateHistory([]);
    _setCurrentMapId('0');
  }

  return (
    <div className={className}>
      <MapContainer
        animationEnabled={animationEnabled}
        onAnimationEnd={pauseAnimation}
        phaseTwoStartPercentage={phaseTwoStartPercentage}
        animationDuration={animationDuration}
      >
        {stateHistory.length > 0 ? (
          <BackButton
            className="anticon"
            src={'/images/prev_no_circle.svg'}
            onClick={onBackButtonClicked}
          />
        ) : null}
        <SvgLoader width="600" height="600" path={zones[currentMapId].url}>
          <SvgProxy selector=".zone" onElementSelected={configureSVGZones} />
        </SvgLoader>
      </MapContainer>
    </div>
  );
};

export default styled(HierarchicalMap)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
