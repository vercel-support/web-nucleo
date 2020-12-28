import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { MailchimpStatus } from '../../common/model/mailchimp/enums/mailchimpStatus.enum';
import useI18n from '../../common/hooks/useI18n';
import { GA_SOCIALMEDIA_TRACKING_ID } from '../../libs/gtag';
import { Header, Footer } from '../../components/shared';

interface StaticProps {
  status: string;
}

type Props = StaticProps;

const Layout = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;

  font-family: ${(props) => props.theme.font.family};
  font-style: ${(props) => props.theme.font.style};
`;

const Content = styled.main`
  position: relative;
  flex: auto;
  margin-top: ${(props) => props.theme.headerHeight};
  min-height: ${(props) =>
    `calc(100vh - ${props.theme.headerHeight} - ${props.theme.footerHeight})`};
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
`;

const Card = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  padding: 64px;
  @media ${(props) => props.theme.breakpoints.mdd} {
    padding: 40px;
  }
  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 32px;
  }
`;

const CardRow = styled(Row)`
  margin-bottom: 0 !important;
`;

const Title = styled.h1`
  ${(props) => props.theme.font.h1}
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
  margin-bottom: 24px;
`;

const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  @media ${(props) => props.theme.breakpoints.smd} {
    font-size: 14px;
  }
  font-weight: 500;
  line-height: 22px;
`;

const VisitBlogRow = styled(Row)`
  margin-top: 32px;
`;

const VisitBlogButton = styled(Button)`
  border-radius: 20px;
`;

const FlatDetailPage = ({ status }: Props): JSX.Element => {
  const i18n = useI18n();

  useEffect(() => {
    if (GA_SOCIALMEDIA_TRACKING_ID && window && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${GA_SOCIALMEDIA_TRACKING_ID}/XM8fCMOE7uABENTdlJ8C`,
      });
    }
  }, []);

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('subscriptionStatus.metaTitle')}</title>
        <meta
          name="description"
          content={i18n.t('subscriptionStatus.metaDescription')}
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {typeof window === 'undefined' && (
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
         *, *::before, *::after {
           transition: none!important;
         }
         `,
            }}
          />
        )}
      </Head>
      <Header />

      <Content>
        <Card>
          <CardRow gutter={[24, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title>{i18n.t(`subscriptionStatus.title.${status}`)}</Title>
              <Divider />
              <Subtitle>
                {i18n.t(`subscriptionStatus.subtitle.${status}`)}
              </Subtitle>
            </Col>
            <Col xs={24} md={{ span: 10, offset: 1 }}>
              <Subtitle>
                {i18n.t('subscriptionStatus.messages.visitBlog')}
              </Subtitle>
              <VisitBlogRow justify="center">
                <Col>
                  <Link href="/blog" passHref>
                    <VisitBlogButton
                      type="primary"
                      htmlType="button"
                      size="large"
                    >
                      {i18n.t('subscriptionStatus.actions.visitBlog')}
                    </VisitBlogButton>
                  </Link>
                </Col>
              </VisitBlogRow>
            </Col>
          </CardRow>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [MailchimpStatus.SUBSCRIBED, MailchimpStatus.PENDING].map(
    (status) => ({
      params: { status },
    })
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  return {
    props: {
      status: params.status as string,
    },
  };
};

export default FlatDetailPage;
