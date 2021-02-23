import { RawElement } from "./RawElement";
import { ElementType } from "./ElementType";
import { Client } from "..";
import { AuthToken } from "./AuthToken";
import { x0ApiError } from "../util/errors";

export class Element {
  namespace: string;
  key: string;
  type: ElementType;
  data: string;
  delete: (token: AuthToken) => Promise<boolean | x0ApiError>;


  constructor({
    namespace,
    type,
    key,
    data
  }: RawElement) {
    this.namespace = namespace;
    this.key = key;
    this.type = type === 0 ? "paste" : "redirect"; // 0 - paste, 1 - redirect
    this.data = data;

    this.delete = async (token: AuthToken) => await Client.deleteElement(token, this.namespace, this.key);
  }


}
