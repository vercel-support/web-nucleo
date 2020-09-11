import { createContext, useContext } from 'react';
import axios from 'axios';

import { IContact } from '../model/mailchimp/contact.model';
import { ResponseType } from '../../api/mailchimp/subscribe';

interface IMailchimpService {
  subscribe(contact: IContact): Promise<ResponseType>;
}

class MailchimpService implements IMailchimpService {
  private axiosInstance = axios.create({
    baseURL: '/api/mailchimp/',
  });

  async subscribe(contact: IContact): Promise<ResponseType> {
    return this.axiosInstance.post<IContact, ResponseType>('subscribe', {
      contact,
    });
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
