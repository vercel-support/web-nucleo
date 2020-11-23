import styled from 'styled-components';
import { useState } from 'react';
import { IZone } from '../../common/model/zone.model';
import { SvgLoader, SvgProxy } from 'react-svgmt';

type Props = {
    zones: IZone[]
};

const SVGContainer = styled.div`
  & .text {
    pointer-events: none;
  }
  & .zone path:hover {
    fill: red !important;
  }
`;

const HierarchicalMap = ({ zones }: Props): JSX.Element => {
  const [currentMapId, setCurrentMapId] = useState('0');


  const configureSVGZones = (svgElements: SVGGeometryElement[]) => {
    for (let svgElement of svgElements) {
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

      svgElement.addEventListener('click', (e) => {
        console.log(elementId);
        console.log(zone);
        
        if (zone.url && zone.hasFlats) {
          setCurrentMapId(elementId);
        } else if (zone.hasFlats) {
          console.log('TODO: redirect to search with the current map id set');
        } else {
          console.log('Zone selected has no flats');
        }
      });
    }
  }

  return (
    <SVGContainer>
      <SvgLoader width="1080" height="1080" path={zones[currentMapId].url}>
          <SvgProxy selector=".zone" onElementSelected={configureSVGZones} />
      </SvgLoader>
    </SVGContainer>
  );
};

export default HierarchicalMap;
