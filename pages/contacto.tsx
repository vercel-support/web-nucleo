import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { deserializeMultiple } from '../common/helpers/serialization';

import { IOffice } from '../common/model/office.model';
import { IContact } from '../common/model/mailchimp/contact.model';
import useI18n from '../common/hooks/useI18n';
import useMailchimpService from '../common/hooks/mailchimpService';
import { getOffices } from '../backend/offices';
import {
  ContactFormSection,
  OfficesSection,
  OfficeFlatsSection,
} from '../components/contact';
import { Header, Footer } from '../components/shared';
import { IFlat } from '../common/model/flat.model';
import Flat from '../backend/salesforce/flat';

interface StaticProps {
  offices: IOffice[];
  serializedFlats: string;
}

type Props = StaticProps;

function isInteger(value) {
  return /^\d+$/.test(value);
}

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

const ContactPage = ({ offices, serializedFlats }: Props): JSX.Element => {
  const router = useRouter();
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();
  const flats = deserializeMultiple(serializedFlats, IFlat);
  const officesSectionRef = useRef(null);
  const [selectedOfficeIndex, setSelectedOffice] = useState(2);
  const onSendButtonClicked = (contact: IContact) => {
    mailchimpService.subscribe(contact, router, i18n);
  };

  useEffect(() => {
    const oficina = new URLSearchParams(window.location.search).get('oficina');
    if (
      oficina &&
      isInteger(oficina as string) &&
      parseInt(oficina as string) < offices.length
    ) {
      const newOfficeIndex = parseInt(oficina as string);
      setSelectedOffice(newOfficeIndex);
      if (
        officesSectionRef &&
        'current' in officesSectionRef &&
        officesSectionRef.current
      ) {
        setTimeout(() => {
          officesSectionRef.current.scrollIntoView(true);
        });
      }
    }
  }, []);
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
        <div ref={officesSectionRef}></div>
        <OfficesSection
          offices={offices}
          selectedOfficeIndex={selectedOfficeIndex}
          setSelectedOffice={setSelectedOffice}
        />
        <OfficeFlatsSection flats={flats} />
      </Content>

      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);

  return {
    props: {
      offices: getOffices(),
      serializedFlats: serializedFlats,
    },
  };
};

export default ContactPage;
