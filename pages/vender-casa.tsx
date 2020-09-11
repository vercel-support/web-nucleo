import Head from 'next/head';
import styled from 'styled-components';
import * as Scroll from 'react-scroll';
import { message } from 'antd';

import { IContact } from '../common/model/mailchimp/contact.model';
import { MailchimpStatus } from '../common/model/mailchimp/enums/mailchimpStatus.enum';
import useI18n from '../common/hooks/useI18n';
import useMailchimpService from '../common/hooks/mailchimpService';
import {
  SellHouseForm,
  WhySellWithUs,
  InfoSection,
  ContactUsButton,
} from '../components/sellHouse';
import { Header, Footer } from '../components/shared';

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
`;

const WhySellWithUsSection = styled.div`
  margin-top: 3rem;
  margin-left: ${(props) => props.theme.grid.getGridColumns(2, 1)};
  margin-right: ${(props) => props.theme.grid.getGridColumns(2, 1)};
`;

const ContactUsSection = styled.div`
  margin-top: 3rem;
  &.smd-only {
    @media ${(props) => props.theme.breakpoints.mdu} {
      display: none;
    }
  }
`;

const Separator = styled.div`
  margin-top: 1rem;
`;

const VenderCasaPage = (): JSX.Element => {
  const i18n = useI18n();
  const mailchimpService = useMailchimpService();

  const onSendButtonClicked = async (contact: IContact): Promise<void> => {
    try {
      const res = await mailchimpService.subscribe(contact);
      if (res.status === MailchimpStatus.PENDING) {
        message.success(i18n.t('messages.subscriptionSuccess'));
      }
    } catch (error) {
      message.error(i18n.t('messages.subscriptionError'));
    }
  };

  const onContactUsButtonClicked = () => {
    Scroll.animateScroll.scrollToTop({ smooth: true });
    document.getElementById('name').focus(); // TODO: make non-hardcoded
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{i18n.t('sellHouse.metaTitle')}</title>
        <meta
          name="description"
          content={i18n.t('sellHouse.metaDescription')}
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
        <SellHouseForm onSendButtonClicked={onSendButtonClicked} />
        <WhySellWithUsSection>
          <WhySellWithUs />
        </WhySellWithUsSection>
        <ContactUsSection className="smd-only">
          <ContactUsButton onClick={onContactUsButtonClicked} />
        </ContactUsSection>
        <InfoSection
          imageUrl={'sell_house_house_value_background.png'}
          left={true}
          title={i18n.t('sellHouse.houseValue.title')}
          subtitle={i18n.t('sellHouse.houseValue.subtitle')}
          description={i18n.t('sellHouse.houseValue.description')}
        />
        <InfoSection
          imageUrl={'sell_house_ideal_buyer_background.png'}
          left={false}
          title={i18n.t('sellHouse.idealBuyer.title')}
          subtitle={i18n.t('sellHouse.idealBuyer.subtitle')}
          description={i18n.t('sellHouse.idealBuyer.description')}
        />
        <InfoSection
          imageUrl={'sell_house_adjust_needs_background.png'}
          left={true}
          title={i18n.t('sellHouse.adjustNeeds.title')}
          subtitle={i18n.t('sellHouse.adjustNeeds.subtitle')}
          description={i18n.t('sellHouse.adjustNeeds.description')}
        />
        <ContactUsSection>
          <ContactUsButton onClick={onContactUsButtonClicked} />
        </ContactUsSection>
        <Separator />
      </Content>

      <Footer />
    </Layout>
  );
};

export default VenderCasaPage;
