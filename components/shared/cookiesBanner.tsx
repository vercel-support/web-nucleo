import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { Row, Col, Button } from 'antd';

import i18Next from '../../i18n';

const { withTranslation } = i18Next;

type Props = {
  className?: string;
  setCookiesAccepted: Dispatch<SetStateAction<boolean>>;
} & WithTranslation;

const Text = styled.div`
  color: #f5f5f5;
`;

const CookiesBanner = ({
  className,
  setCookiesAccepted,
  t,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <Row align={'middle'}>
        <Col xs={12} lg={14} xl={16}>
          <Text>{t('cookies.text')}</Text>
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
                {t('cookies.actions.ok')}
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Link href="/legal/cookies" passHref>
                <Button type={'default'} ghost>
                  {t('cookies.actions.moreInfo')}
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
};

export default styled(withTranslation('common')(CookiesBanner))`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.85);
`;
