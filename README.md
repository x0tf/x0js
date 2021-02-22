# x0js

A small nodejs client for interacting with the [x0](https://x0.tf/) API.

[![Test](https://github.com/x0tf/x0js/actions/workflows/test.yml/badge.svg)](https://github.com/x0tf/x0js/actions/workflows/test.yml)

## Getting started

1.  Install the package by running the command
    ```
    npm install x0js
    ```

2. Require or import and use the package
    ```js
    const x0js = require('x0js')
    const x0 = new x0js.Client() 

    // if the token varibale is undefined an error occured or something else went wrong
    const token = await x0.namespace.create('myfirstnamespace');
    // the returned token will be required for all future operations, make sure to save it well!!
    ```

With the token and namespace figured out, lets get started with creating our first elements!

## Elements
#### Creating Elements

```js
const myFirstPaste = await x0.elements.create(token, {
    elementtype: 'paste',
    namespace: 'myfirstnamespace',
    data: 'some text',
    key: 'custom' // optional, if this is not present the key will be random
})
```
The newly created paste would then be available at 'x0.tf/myfirstnamespace/custom'

#### Deleting Elements

```js
await x0.deleteElement(token, 'myfirstnamespace', 'custom')
```

OR  

```js
const elementToDelete = await x0.elements.get('myfirstnamespace', 'custom')
await elementToDelete.delete(token)
```

## Dealing with namespaces

#### Creating
```js
await x0.namespace.create('mysecondnamespace');
```

#### Deleting
```js
await x0.namespace.delete(token, 'myfirstnamespace')
```
#### Get all Elements
```js
await x0.namespace.getAll(token, 'myfirstnamespace') /** @returns: {Element[]} */
```
## Get API Information
```js
x0.serverInfo()
/* 
Output:
{
    invites,
    production,
    version,
    responseTime
}
*/
```
