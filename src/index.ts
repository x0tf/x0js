import NamespaceManager from './elements/NamespaceManager';
import RedirectManager from './elements/RedirectManager';
import PasteManager from "./elements/PasteManager";
import {AuthToken} from "./@interfaces/AuthToken";
import {endpoints} from "./util/Constants";
import {errorHandler} from "./util/errors";
import http from "./util/http";
import ElementManager from './elements/ElementManager';

export class Client {

    deleteElement: (token: AuthToken, namespace: string, key: string) => Promise<boolean>;
    serverInfo: () => Promise<any>; 
    // namespace: typeof NamespaceManager;
    // redirect: typeof RedirectManager;
    // paste: typeof  PasteManager;
    elements: typeof ElementManager;

   
    constructor() {
        // this.paste = PasteManager;
        // this.redirect = RedirectManager;
        // this.namespace = NamespaceManager;
        this.elements = ElementManager;
        this.serverInfo = () => Client.serverInfo();
        this.deleteElement = (token: AuthToken, namespace: string, key: string) => Client.deleteElement(token, namespace, key);
    }


    /**
     * 
     * @param token 
     * @param namespace 
     * @param key 
     */
    static async deleteElement(token: AuthToken, namespace: string, key: string): Promise<boolean> {
        try {
            const res = await http.delete(token, endpoints.Element.replace("%%namespace%%", namespace).replace("%%key%%", key));
            console.log(res);
            return true;
        } catch (e) {
            console.log(e)
            errorHandler(e)
            return false;
        }
    };


    /**
     * @description get api information
     * @returns returns the raw json response from the /v1/info endoint that looks like so: 
     * {
     *  invites: boolean,
     *  prodction: boolean,
     *  version: string,
     *  response_time: number (in ms)
     * }
     */
    static async serverInfo(): Promise<JSON | undefined> {
        try {
            // I'm just passing ping as a string cause that will give us the response time as well
            return await http.get('ping', endpoints.Info);
        } catch (e) {
            errorHandler(e);
        }
    };
    

}
