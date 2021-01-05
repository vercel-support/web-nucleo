import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useState, useEffect } from 'react';
import { IZone } from '../../common/model/zone.model';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { canonizeSearchQuery } from '../../common/helpers/searchQuery.utils';
import { Breadcrumb } from 'antd';
import tippy from 'tippy.js';

type Props = {
  zones: Record<string, IZone>;
  className?: string;
  theme: DefaultTheme;
};

const Placeholder = styled.div`
  height: 600px;
`;

const MapContainer = styled.div<{
  animationEnabled: boolean;
  phaseTwoStartPercentage: number;
  animationDuration: number;
}>`
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-bottom: 24px;
    margin-top: 24px;
  }

  // @media ${(props) => props.theme.breakpoints.lgu} {
  //   -webkit-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  //   -moz-box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  //   box-shadow: 0px 6px 21px -4px rgba(0, 0, 0, 0.25);
  //   border-radius: ${(props) => props.theme.borderRadius};
  // }

  position: relative;
  display: inline-block;
  @media ${(props) => props.theme.breakpoints.smd} {
    width: 100%;
  }

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

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media ${(props) => props.theme.breakpoints.mdu} {
    & .zone path:hover {
      fill: ${(props) => props.theme.colors.secondary} !important;
    }
    & .zone polygon:hover {
      fill: ${(props) => props.theme.colors.secondary} !important;
    }
  }

  @media ${(props) => props.theme.breakpoints.smd} {
    & .zone path:active {
      fill: ${(props) => props.theme.colors.secondary} !important;
    }
    & .zone polygon:active {
      fill: ${(props) => props.theme.colors.secondary} !important;
    }
  }

  & .zone {
    outline: none;
  }

  & > svg {
    -webkit-filter: drop-shadow(0px 6px 14px rgba(0,0,0,0.16));
    filter: drop-shadow(0px 6px 14px rgba(0,0,0,0.16));
  }
`;

const BreadcrumbComponent = styled(Breadcrumb)`
  z-index: 199;
  position: absolute;
  top: -4px;
  left: 40px;
`;

const BackButton = styled.img`
  z-index: 199;
  position: absolute;
  cursor: pointer;
  top: calc(50% - 9px);
  left: 2px;
  height: 18px;
  width: 18px;
  color: ${(props) => props.theme.colors.secondary};
`;

const HierarchicalMap = ({ zones, className, theme }: Props): JSX.Element => {
  const [currentMapId, _setCurrentMapId] = useState('0');
  const [stateHistory, setStateHistory] = useState([]);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const phaseTwoStartPercentage = 35;
  const animationDuration = 500;
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  let breadcrumbStates;
  if (!(currentMapId in stateHistory)) {
    breadcrumbStates = [...stateHistory, currentMapId];
  } else {
    breadcrumbStates = stateHistory;
  }
  breadcrumbStates = breadcrumbStates.slice(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMdu = !useMediaQuery({ query: theme.breakpoints.smd });

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
    tippy('svg .zone', {
      content: (reference) => canonizeSearchQuery(reference.id),
      theme: 'dark',
      touch: ['hold', 300],
    });
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

      const paths = svgElement.querySelectorAll('path, polygon');
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i] as SVGPolygonElement | SVGPathElement;
        if (zone.hasFlats) {
          path.style.fill = '#EF7048';
          path.style.cursor = 'pointer';
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

  const zoneUrls = Object.values(zones)
    .filter((zone) => zone.url)
    .map((zone) => zone.url);
  return (
    <div className={className}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isMounted ? (
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
            {breadcrumbStates.length > 0 && isMdu ? (
              <BreadcrumbComponent separator=">">
                {breadcrumbStates.map((state) => {
                  return (
                    <Breadcrumb.Item key={state}>
                      {` ${canonizeSearchQuery(state)} `}
                    </Breadcrumb.Item>
                  );
                })}
              </BreadcrumbComponent>
            ) : null}
            <SvgLoader
              width={isMdu ? '600' : '100%'}
              path={zones[currentMapId].url}
            >
              <SvgProxy
                selector=".zone"
                onElementSelected={configureSVGZones}
              />
            </SvgLoader>
          </MapContainer>
        ) : (
          <Placeholder />
        )}
      </div>
      {zoneUrls.map((zoneUrl) => (
        <link key={zoneUrl} rel="prefetch" href={zoneUrl} as="image" />
      ))}
    </div>
  );
};

export default withTheme(styled(HierarchicalMap)`
  flex: 2;
`);
