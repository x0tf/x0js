import { Client } from './../index';

interface CallbackFunc { (response: string): void }

/**
 * @class namespace
 */
export default class namespace {
    private _tokens: Map<string, string>;
    constructor (tokens: Map<string, string>) {
        this._tokens = tokens;
        console.log(this._tokens);
    }

    /**
     * @param { string } namespace - the desired namespace
     * @description register a new namespace
     * @returns { string } the token for the namespace that was registered, or a callback if specified
     */
    static register(namespace: string, callback?: CallbackFunc): void | string {
        console.log("aa poo poo")
        if (callback) return callback("a")
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