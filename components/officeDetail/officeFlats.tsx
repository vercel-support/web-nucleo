import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { Title } from './';
import { ResultsSection } from '../../components/shared';

type Props = {
  flats: IFlat[];
  className?: string;
};

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(242, 242, 242, 0) 0%,
    #f2f2f2 39.61%
  );
  height: 37vh;
  width: 100%;
`;

const ShowMore = styled.div`
  position: absolute;
  bottom: 10vh;
  left: 0;
  right: 0;
`;

const ShowMoreButton = styled(Button)`
  width: 100%;
`;

const OfficeFlatsSection: React.FC<Props> = ({ flats, className }) => {
  const [showAllFlats, setShowAllFlats] = useState(false);
  const i18n = useI18n();
  const flatsToShow = showAllFlats ? flats : flats.slice(0, 4);
  return (
    <div className={className}>
      <Title text={i18n.t('officeDetail.messages.flatsTitle')} />
      <ResultsSection
        flats={flatsToShow}
        xlSpan={12}
        cardBackgroundColor="white"
      />
      {showAllFlats ? null : (
        <Gradient>
          <ShowMore>
            <Row justify="center">
              <Col
                xs={{ span: 20 }}
                sm={{ span: 14 }}
                md={{ span: 10 }}
                lg={{ span: 7 }}
                xl={{ span: 5 }}
                xxl={{ span: 3 }}
              >
                <ShowMoreButton
                  type="primary"
                  onClick={() => {
                    setShowAllFlats(true);
                  }}
                >
                  <span>{i18n.t('officeDetail.actions.showMoreFlats')}</span>
                </ShowMoreButton>
              </Col>
            </Row>
          </ShowMore>
        </Gradient>
      )}
    </div>
  );
};

export default styled(OfficeFlatsSection)`
  background-color: ${(props) => props.theme.colors.grey};
  padding-top: 48px;
  padding-bottom: 56px;
  overflow: hidden;
  position: relative;
`;
