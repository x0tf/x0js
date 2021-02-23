import { ElementManager } from "../managers/ElementManager";
import { NamespaceManager } from "../managers/NamespaceManager";
import { AuthToken } from "./AuthToken";
import { Element } from "./Element";
import { ElementType } from "./ElementType";

export class Namespace {
    
    name: string;
    private token: string;
    resetToken: () => Promise<string | undefined>;
    getAll: () => Promise<Element[] | undefined>;
    delete: () => Promise<boolean>;
    elements: {
        create: typeof ElementManager.create,
        get: typeof ElementManager.get
    }
    
    

    constructor({
        name,
        token
    }: {
        name: string,
        token: AuthToken
    }) 
    {

        this.name = name;
        this.token = token;

        this.elements = {
            // @ts-ignore
            create: async ({ elementtype, data, key }: { elementtype: ElementType, data: any, key?: string }) => await ElementManager.create(this.token, { elementtype: elementtype, namespace: this.name, data: data, key: key }),
            get: async (key: string) => await ElementManager.get(this.token, this.name, key)
        };

        this.delete = async() => await NamespaceManager.delete(this.token, this.name);
        this.getAll = async () => await NamespaceManager.getAll(this.token, this.name);
        this.resetToken = async () => await NamespaceManager.resetToken(this.token, this.name);
    }

}