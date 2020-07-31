import { createContext, useContext } from 'react';
import axios from 'axios';

import { IContact } from '../common/model/mailchimp/contact.model';

interface IMailchimpService {
  subscribe(contact: IContact): Promise<void>;
}

class MailchimpService implements IMailchimpService {
  private axiosInstance = axios.create({
    baseURL: '/api/mailchimp/',
  });

  async subscribe(contact: IContact): Promise<void> {
    return this.axiosInstance.post('subscribe', {
      contact,
    });
  }
}

const mailchimpService = new MailchimpService();

const MailchimpServiceContext = createContext<IMailchimpService>(
  mailchimpService
);

export const useMailchimpService = (): IMailchimpService => {
  return useContext(MailchimpServiceContext);
};
