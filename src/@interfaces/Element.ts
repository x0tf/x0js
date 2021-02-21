import { RawElement } from './RawElement';
import { ElementType } from "./ElementType";
import { Client } from "..";
import { AuthToken } from "./AuthToken";
import http from '../util/http';
import { endpoints } from '../util/Constants';
import { errorHandler } from '../util/errors';

export class Element {
  namespace: string;
  key: string;
  type: ElementType;
  data: string;
  delete: (token: any) => Promise<boolean>;

  constructor(rawelement: RawElement) {
    this.namespace = rawelement.namespace;
    this.key = rawelement.key;
    this.type = rawelement.type === 0 ? "paste" : "redirect"; // 0 - paste, 1 - redirect
    this.data = rawelement.data;

    // @ts-ignore
    this.delete = (token: any) => Element.Delete(token, this.namespace, this.key);

  }
  
  // @ts-ignore
  static Delete(token: AuthToken, namespace: string, key: string) { 
    return Client.deleteElement(token, namespace, key) 
  };
  
  
}
