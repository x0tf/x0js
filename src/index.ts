import NamespaceManager from './elements/NamespaceManager';
import RedirectManager from './elements/RedirectManager';
import PasteManager from "./elements/PasteManager";
import {AuthToken} from "./@interfaces/AuthToken";
import {endpoints} from "./util/Constants";
import {errorHandler} from "./util/errors";
import http from "./util/http";

export class Client {

    deleteElement: (token: AuthToken, namespace: string, key: string) => Promise<any>;
    namespace: typeof NamespaceManager;
    redirect: typeof RedirectManager;
    paste: typeof  PasteManager;

   
    constructor() {

        this.namespace = NamespaceManager;
        this.redirect = RedirectManager;
        this.paste = PasteManager;
        // @ts-ignore
        this.deleteElement = (... args: any) => Client.deleteElement(... args);
    }

    static async deleteElement(token: AuthToken, namespace: string, key: string): Promise<any> {
        try {
            return (await http.delete(token, endpoints.Element.replace("%%namespace%%", namespace).replace("%%key%%", key))).status === 200;
        } catch (e) {
            errorHandler(e)
            return false;
        }
    };
    

}
