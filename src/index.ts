import elements from './elements/elements';
import namespace from './elements/namespace';

export class Client {
    /* tokens is an object like this:
        tokens: {
            'examplenamespace': 'exampletoken'
        }
    */
    _tokens: Map<string, string>;
    elements: { namespace: namespace; };
   
    constructor(tokens:any) {
        this._tokens = new Map();
        /*  if we get a valid tokenobject from the user
            we set the tokens to our internal token map
            if not, the user probably wants to either 
            register a new token later or i dont know, whatever
        */
        if (typeof tokens === 'object') for (const namespace in tokens) this._tokens.set(namespace, tokens[namespace])

        this.elements = {
            namespace: new namespace(this._tokens),
        };
    }
}