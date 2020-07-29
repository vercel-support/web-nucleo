import { IStringToAnyDictionary } from '../stringToAnyDictionary.model';

export interface IEvent {
  name: string;
  properties: IStringToAnyDictionary;
}
