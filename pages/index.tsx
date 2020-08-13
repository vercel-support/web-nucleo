import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { IContact } from '../common/model/mailchimp/contact.model';
import { IFlat } from '../common/model/flat.model';
import useI18n from '../common/hooks/useI18n';
import useCookiesAcceptedState from '../common/hooks/cookiesAcceptedState';
import useMailchimpService from '../common/hooks/mailchimpService';
import { deserializeMultiple } from '../common/helpers/serialization';
import Flat from '../backend/salesforce/flat';
import { BlogShowcase, Hero, NewsletterSection } from '../components/home';
import {
  Header,
  Footer,
  CookiesBanner,
  FlatsDisplayPlaceholder,
} from '../components/shared';

interface StaticProps {
  flats: string;
}

type Props = StaticProps;

const FlatsDisplayContainer = styled.div`
  background-color: #f2f2f2;
  padding-top: 100px;
  padding-bottom: 70px;
`;

const FlatsDisplay = dynamic(
  () => import('../components/shared/flatsDisplay/flatsDisplay'),
  {
    ssr: false,
    loading: () => <FlatsDisplayPlaceholder />,
  }
);

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
  flex: auto;
`;

export const Home = ({ flats }: Props): JSX.Element => {
  const i18n = useI18n();
  const [cookiesAccepted, setCookiesAccepted] = useCookiesAcceptedState();
  const mailchimpService = useMailchimpService();

  const deserializedFlats = deserializeMultiple(flats, IFlat);

  const onSellButtonClicked = async (
    name: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  ): Promise<void> => {
    try {
      const contact: IContact = { EMAIL: email };
      if (name) {
        contact.FNAME = name;
      }
      if (lastName) {
        contact.LNAME = lastName;
      }
      if (phone) {
        contact.PHONE = phone;
      }
      if (address) {
        contact.HADDRESS = address;
      }
      await mailchimpService.subscribe(contact);
    } catch (error) {
      // TODO: manage error
    }
  };

  const onSubscribeButtonClicked = async (email: string): Promise<void> => {
    try {
      const contact: IContact = { EMAIL: email };
      await mailchimpService.subscribe(contact);
    } catch (error) {
      // TODO: manage error
    }
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('title')}</title>
        <meta name="description" content={i18n.t('home.description')} />
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
        <Hero onSellButtonClicked={onSellButtonClicked} />
        <FlatsDisplayContainer>
          <FlatsDisplay
            flats={deserializedFlats}
            title={i18n.t('section-flats-title')}
          />
        </FlatsDisplayContainer>
        <BlogShowcase />
        <NewsletterSection
          onSubscribeButtonClicked={onSubscribeButtonClicked}
        />
      </Content>

      <Footer />

      {!cookiesAccepted && (
        <CookiesBanner setCookiesAccepted={setCookiesAccepted} />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const flats = await Flat.getFlats();
  const serializedFlats = Flat.serialize(flats);

  return {
    props: {
      flats: serializedFlats,
    },
  };
};

export default Home;
