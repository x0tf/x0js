import { errorHandler } from "../util/errors";
import {endpoints} from "../util/Constants";
import http from '../util/http';
import {Client} from "../index";

export default class PasteManager {

    /**
     * @description creates a new paste element and returns the key where you can reach the element from now on
     * @param token Auth token to interact with the given namespace
     * @param namespace the namespace where you want to create the paste element in
     * @param data the text you want to have inside the paste
     * @param [key] custom key (optional)
     * @returns {Promise<string | undefined>} the key where you can reach this element from now on
     */
    static async create(token: string, namespace: string, data: any, key?: string): Promise<string | undefined> {
        try {
            let route = endpoints.CreatePasteElement.replace("%%namespace%%", namespace)
            key ? route = route.replace("%%key%%", key) : route = route.replace("%%key%%", "")
            return (await http.post(token, route, { content: data })).key
        } catch (e) {
            errorHandler(e)
        }
    };



    // @ts-ignore
    static delete = async (token: AuthToken, namespace: string, key: string): Promise<boolean> => Client.deleteElement(token, namespace, key)

}