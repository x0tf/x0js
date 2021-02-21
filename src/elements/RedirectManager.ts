import {endpoints} from "../util/Constants";
import http from "../util/http";
import {errorHandler} from "../util/errors";
import {Client} from "../index";

export default class RedirectManager {

    /**
     * @description create a new redirect
     * @param token AuthToken
     * @param namespace namespace where you want to create the redirect in
     * @param url target url where the redirect should point to
     * @param [key] custom key (optional)
     * @return {Promise<string | undefined>} the key where you can reach this element from now on
     */
    static async create(token: string, namespace: string, url: string, key?: string) {
        try {
            let route = endpoints.CreateRedirectElement.replace("%%namespace%%", namespace)
            key ? route = route.replace("%%key%%", key) : route = route.replace("%%key%%", "")
            return (await http.post(token, route, {target: url})).key
        } catch (e) {
            errorHandler(e)
        }

    };

    // @ts-ignore
    static delete = async (token: AuthToken, namespace: string, key: string): Promise<boolean> => Client.deleteElement(token, namespace, key)
}