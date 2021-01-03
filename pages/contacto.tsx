import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { IOffice } from '../common/model/office.model';
import { IContact } from '../common/model/mailchimp/contact.model';
import useI18n from '../common/hooks/useI18n';
import useMailchimpService from '../common/hooks/mailchimpService';
import { getOffices } from '../backend/offices';
import { ContactFormSection, OfficesSection } from '../components/contact';
import { Header, Footer } from '../components/shared';

interface StaticProps {
  offices: IOffice[];
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
  @media ${(props) => props.theme.breakpoints.mdd} {
    margin-top: 0;
  }
  background-color: ${(props) => props.theme.colors.grey};
`;

const ContactPage = ({ offices }: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();

  const onSendButtonClicked = (contact: IContact) => {
    mailchimpService.subscribe(contact, router, i18n);
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('contact.metaTitle')}</title>
        <meta name="description" content={i18n.t('contact.metaDescription')} />
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
        <ContactFormSection onSendButtonClicked={onSendButtonClicked} />
        <OfficesSection offices={offices} />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  return {
    props: {
      offices: getOffices(),
    },
  };
};

export default ContactPage;
