import elements from './elements/elements';
import NamespaceManager from './elements/NamespaceManager';

export class Client {
    /* tokens is an object like this:
        tokens: {
            'examplenamespace': 'exampletoken'
        }
    */
    _tokens: Map<string, string>;
    elements: typeof elements;
    
   
    constructor(tokens:any) {
        this._tokens = new Map();
        /*  if we get a valid tokenobject from the user
            we set the tokens to our internal token map
            if not, the user probably wants to either 
            register a new token later or i dont know,
            the plan is, to pass this tokenMap into each
            element class when instantiating it here, but
            the tokens should be optional, so keep in mind
            to have an optional token parameter on each method

            ^^^ Forget this shit, gonna make this library stateless
        */
        if (typeof tokens === 'object') for (const namespace in tokens) this._tokens.set(namespace, tokens[namespace])

        this.elements = elements
    }
    

}
