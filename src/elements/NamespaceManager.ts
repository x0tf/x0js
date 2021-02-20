
/**
 * @callback RegisterCallback
 * @param {string} token
 */
interface RegisterCallback { (err: any, token: string): void }

/**
 * @class namespace
 */
export default class NamespaceManager {

    /**
     * @param {string} namespace - the desired namespace
     * @param {RegisterCallback} [callback] - callback that gets the new token as argument
     * @description register a new namespace
     * @returns {string} the token for the namespace that was registered, or a callback if specified
     * @callback RegisterCallback
     * @param {*} error - only present if an error occured
     * @param {string} token - token that is returned by x0 and is now linked to this namespace
     */
    static register(namespace: string, callback?: RegisterCallback): void | string {
        console.log("aa poo poo")
        // the callback function is optional, so we only call it
        // if the parameter is present, pass null as first arg to
        // indicate that no error occured
        if (callback) return callback(null, "a")
        return "a";
    };
    static activate() {

    };
    static deactivate() {

    };
    static resetToken() {

    };
    static getAll() {

    };
}