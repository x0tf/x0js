import { RawElement } from "./RawElement";
import { ElementType } from "./ElementType";
import { Client } from "..";
import { AuthToken } from "./AuthToken";

export class Element {
  namespace: string;
  key: string;
  type: ElementType;
  data: string;
  delete: (token: AuthToken) => Promise<boolean>;

  constructor(rawelement: RawElement) {
    this.namespace = rawelement.namespace;
    this.key = rawelement.key;
    this.type = rawelement.type === 0 ? "paste" : "redirect"; // 0 - paste, 1 - redirect
    this.data = rawelement.data;

    this.delete = (token: AuthToken) =>
      Client.deleteElement(token, this.namespace, this.key);
  }
}
