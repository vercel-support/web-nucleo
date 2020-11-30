import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useState, useEffect } from 'react';
import { IZone } from '../../common/model/zone.model';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { useRouter } from 'next/router';
import useI18n from '../../common/hooks/useI18n';
import { useMediaQuery } from 'react-responsive';
import { canonizeSearchQuery } from '../../common/helpers/searchQuery.utils';
import { Breadcrumb } from 'antd';

type Props = {
  zones: Record<string, IZone>;
  className?: string;
  theme: DefaultTheme;
};

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  color: ${(props) => props.theme.colors.secondary};
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const Divider = styled.div`
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-top: 24px;
  margin-bottom: 24px;
  border-top: 1px solid #e0e0e0;
`;

const Placeholder = styled.div`
  height: 600px;
`;

const MapContainer = styled.div<{
  animationEnabled: boolean;
  phaseTwoStartPercentage: number;
  animationDuration: number;
}>`
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
  }
  & .zone path:hover {
    fill: ${(props) => props.theme.colors.secondary} !important;
  }
`;

const BreadcrumbComponent = styled(Breadcrumb)`
  position: absolute;
  top: 30px;
  left: 40px;
`;

const BackButton = styled.img`
  position: absolute;
  cursor: pointer;
  top: calc(50% - 9px);
  left: 40px;
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
  const i18n = useI18n();

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

  return (
    <div className={className}>
      <Title>{i18n.t('home.map.title')}</Title>
      <Divider />
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
                      {canonizeSearchQuery(state)}
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
    </div>
  );
};

export default withTheme(styled(HierarchicalMap)`
  padding-top: 48px;
`);
