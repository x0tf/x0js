import { ElementType } from './../@interfaces/ElementType';
import { endpoints } from './../util/Constants';
import { AuthToken } from './../@interfaces/AuthToken';
import { errorHandler } from './../util/errors';
import http from '../util/http';
import { Element } from '../@interfaces/Element';


export default class ElementManager {
    static async create(token: AuthToken,
    {
        elementtype,   
        namespace,
        data,
        key
    }: 
    {
        elementtype: ElementType,
        namespace: string,
        data: any | string,
        key?: string
    }
    ): Promise<Element | undefined> 
    {
        try {
            if (elementtype === 0) elementtype = 'paste' 
                else if (elementtype === 1) elementtype = 'redirect'; 
            let route = endpoints.CreateElement.replace("%%namespace%%", namespace).replace('%%element%%', elementtype)
            key ? route = route.replace("%%key%%", key) : route = route.replace("%%key%%", "")
            let requestBody = {}
            // @ts-ignore
            requestBody[elementtype === 'paste' ? 'content' : 'target'] = data;
            return new Element({
                namespace: namespace,
                key: (await http.post(token, route, requestBody)).key,
                type: elementtype === 'paste' ? 0 : 1,
                data: data
            })
        } catch (e) {
            errorHandler(e)
        }
    }
}