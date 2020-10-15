import { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { IFlat } from '../../common/model/flat.model';
import useI18n from '../../common/hooks/useI18n';
import { ResultsSectionTwoColumns } from '../../components/shared';

type Props = {
  flats: IFlat[];
  className?: string;
};

const Title = styled.h2`
  ${(props) => props.theme.font.h2}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 38px !important;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px !important;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 26px !important;
  }
`;

const Divider = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 64px;
  margin-top: 24px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`;

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

const OfficeFlatsSection = ({ flats, className }: Props): JSX.Element => {
  const [showAllFlats, setShowAllFlats] = useState(false);
  const i18n = useI18n();
  const flatsToShow = showAllFlats ? flats : flats.slice(0, 4);
  return (
    <div className={className}>
      <Title>{i18n.t('contact.flats.title')}</Title>
      <Divider />
      <ResultsSectionTwoColumns
        flats={flatsToShow}
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
                  <span>{i18n.t('contact.flats.showmore')}</span>
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
  margin-top: 64px;
  background-color: ${(props) => props.theme.colors.grey};
  padding-bottom: 54px;
  overflow: hidden;
  position: relative;
`;
