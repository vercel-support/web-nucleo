import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { Fragment } from 'react';
import useI18n from '../../common/hooks/useI18n';
import useCookiesAcceptedState from '../../common/hooks/cookiesAcceptedState';

type Props = {
  className?: string;
};

const Text = styled.div`
  color: #f5f5f5;
  font-size: 16px;
  line-height: 20px;
`;

const CookiesBanner = ({ className }: Props): JSX.Element => {
  const i18n = useI18n();
  const [cookiesAccepted, setCookiesAccepted] = useCookiesAcceptedState();

  return (
    <Fragment>
      {cookiesAccepted ? null : (
        <div className={className}>
          <Row align={'middle'}>
            <Col xs={12} lg={14} xl={16}>
              <Text>{i18n.t('cookies.text')}</Text>
            </Col>
            <Col span={2} />
            <Col xs={8} lg={6} xl={4}>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Button
                    type={'default'}
                    ghost
                    onClick={() => setCookiesAccepted(true)}
                  >
                    {i18n.t('cookies.actions.ok')}
                  </Button>
                </Col>
                <Col xs={24} lg={12}>
                  <Link href="/legal/cookies" passHref>
                    <Button type={'default'} ghost>
                      {i18n.t('cookies.actions.moreInfo')}
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={2} />
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default styled(CookiesBanner)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.85);
  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;
