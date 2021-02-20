import { Element } from "../@interfaces/element";
import { errorHandler } from '../util/errors';
import { endpoints } from '../util/Constants';
import http from '../util/http';

// TODO: move this somewhere useful
type AuthToken = string;

export default class NamespaceManager {

    /**
     * @param {string} namespace - the desired namespace that you want to register with x0
     * @description create a new namespace
     * @returns {string} the token for the namespace that was registered, or a callback if specified
     */
    static async create(namespace: string): Promise<string | undefined> {
        try {
            return (await http.post('', endpoints.Namespace.replace("%%namespace%%", namespace))).token;
        } catch (e) {
            errorHandler(e);
        }
    };


    /**
     *
     * @param token token used for the given namespace
     * @param namespace namespace to delete
     * @returns {Promise<boolean>} - true if successful, false if an error occurred
     */
    static async delete(token: string, namespace: string): Promise<boolean> {
        try {
            return (await http.delete(token, endpoints.Namespace.replace("%%namespace%%", namespace))).status === 200;
        } catch(e) {
            errorHandler(e);
            return false;
        }
    }


    /**
     *
     * @param token token used for the given namespace
     * @param namespace namespace that you want to reset the token for
     * @returns {Promise<string | undefined>} - the new token for the given namespace
     */
    static async resetToken(token: AuthToken, namespace: string): Promise<string | undefined> {
        try {
            return (await http.post(token, endpoints.NamespaceResetToken.replace("%%namespace%%", namespace))).token;
        } catch (e) {
            errorHandler(e);
        }
    };


    /**
     * 
     * @param {AuthToken} token token for the given namespace 
     * @param {string} namespace namespace that you want to get all elements for
     * @returns {Promise<Element[] | undefined>}
     */
    static async getAll(token: AuthToken, namespace: string): Promise<Element[] | undefined> {
        try {
            return (await http.get(token, endpoints.NamespaceElements.replace("%%namespace%%", namespace))).map((element: any) => new Element(element));
        } catch(e) {
            errorHandler(e);
        }
    };
}