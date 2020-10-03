import { createContext, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

import { IContact } from '../model/mailchimp/contact.model';
import { MailchimpStatus } from '../model/mailchimp/enums/mailchimpStatus.enum';
import { ResponseType } from '../../api/mailchimp/subscribe';
import { I18nContextType } from '../../libs/i18n';

interface IMailchimpService {
  subscribe(contact: IContact, i18n: I18nContextType): Promise<void>;
}

class MailchimpService implements IMailchimpService {
  private axiosInstance = axios.create({
    baseURL: '/api/mailchimp/',
  });

  async subscribe(contact: IContact, i18n: I18nContextType): Promise<void> {
    try {
      const res = await this.axiosInstance.post<
        IContact,
        AxiosResponse<ResponseType>
      >('subscribe', {
        contact,
      });

      if (
        res.data.status === MailchimpStatus.SUBSCRIBED ||
        res.data.status === MailchimpStatus.UNSUBSCRIBED ||
        res.data.status === MailchimpStatus.PENDING
      ) {
        message.success(
          i18n.t(`messages.mailchimpSubscription.${res.data.status}`)
        );
      }
    } catch (error) {
      message.error(i18n.t('messages.mailchimpSubscription.error'));
    }
  }
}

const mailchimpService = new MailchimpService();

const MailchimpServiceContext = createContext<IMailchimpService>(
  mailchimpService
);

const useMailchimpService = (): IMailchimpService => {
  return useContext(MailchimpServiceContext);
};

export default useMailchimpService;
