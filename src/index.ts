import { NamespaceManager } from './managers/NamespaceManager';
import { ElementManager } from './managers/ElementManager';
import {AuthToken} from "./@interfaces/AuthToken";
import {endpoints} from "./util/Constants";
import {errorHandler, x0ApiError} from "./util/errors";
import http from "./util/http";

export class Client {

    deleteElement: (token: AuthToken, namespace: string, key: string) => Promise<boolean | x0ApiError>;
    namespace: typeof NamespaceManager;
    elements: typeof ElementManager;
    
    serverInfo: () => Promise<any>; 

   
    constructor() {
        this.elements = ElementManager;
        this.namespace = NamespaceManager;
        this.serverInfo = () => Client.serverInfo();
        this.deleteElement = (token: AuthToken, namespace: string, key: string) => Client.deleteElement(token, namespace, key);
    }


    /**
     * 
     * @param token 
     * @param namespace 
     * @param key 
     */
    static async deleteElement(token: AuthToken, namespace: string, key: string): Promise<boolean | x0ApiError> {
        try {
            if (!token) return new x0ApiError('This route requires a token.')
            return (await http.delete(token, endpoints.Element.replace("%%namespace%%", namespace).replace("%%key%%", key))).statusCode === 200;
        } catch (e) {
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
            // We are just passing null as first parameter cause we dont need a token for this route
            return await http.get(null, endpoints.Info);
        } catch (e) {
            errorHandler(e);
        }
    };
    

}

import { Namespace } from './@interfaces/Namespace';
import { Element } from './@interfaces/Element';
export { Namespace };
export { Element };