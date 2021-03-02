# x0js

A small nodejs client for interacting with the [x0](https://x0.tf/) API. [Read the full Documentation.](https://x0tf.github.io/x0js/)

[![Test](https://github.com/x0tf/x0js/actions/workflows/test.yml/badge.svg)](https://github.com/x0tf/x0js/actions/workflows/test.yml)

# Getting started

1.  Install the package by running the command
    ```
    npm install x0js
    ```

2. Require or import and use the package
    ```js
    const x0js = require('x0js')
    const x0 = new x0js.Client() 
    ```


There are essentially 2 things that are important when working with the x0 API: Namespaces and Elements. Lets get started by creating our first namespace.

# Namespaces

```js
const myfirstnamespace = await x0.namespace.create('myfirstnamespace');
```

If you already have a namespace and token, you would instantiate a new namespace like so: (simply pass in the name of the existing namespace, followed by its token)
```js
const myalreadyexistingnamespace = await x0.namespace.create('myalreadyexistingnamespace', 'kfghdklsjghsneuriiuvherub')
```

This namespace instance now gives us the possibility to do all our following operations without having to enter our token every time. Make sure to save and store your token (myalreadyexistingnamespace.token) so you can instantiate the namespace again later on.

## Namespace Elements

#### Creating
```js
const newPasteElement = await myfirstnamespace.elements.create({
    elementtype: 'paste',
    data: 'my first paste element',
    key: 'mycustomkey' // optinal, if not present the key will be random
});
```

#### Getting a certain element by key
```js
const myElement = await myfirstnamespace.elements.get('customkey');
```

## Namespace Methods

#### Reset Token
If your token ever gets compromised, call this method to reset your token. Returns a new namespace instance.
```js
const myfirstnamespacewithnewtoken = await myfirstnamespace.resetToken();
```

#### Get all Elements
```js
const allElements = await myfirstnamespace.getAll();
```

#### Delete the namespace
```js
await myfirstnamespace.delete();
```


# Elements

To get an instance of an existing element you can either utilize the previosly created namespace instance or do it manually.

#### Getting Elements
With Namespace instance created:
```js 
const elementInstance = await myfirstnamespace.elements.get('mykey');
```
Without:
```js 
const elementInstanceTheHardWay = await x0.elements.get(token, 'myfirstnamespace', 'mykey');
```

#### Creating Elements
With Namespace instance created:
```js 
const myNewElement = await myfirstnamespace.elements.create({
    elementtype: 'paste',
    data: 'test',
    key: 'mykey'
});
```
Without:
```js 
const myNewElementTheHardWay = await x0.elements.create(token, {
    elementtype: 'paste',
    namespace: 'myfirstnamespace',
    data: 'test',
    key: 'mykey'
});
```

## Element Methods
(Things that you can do with your element instance)

#### Delete
```js 
const wasDeleteSuccess = await elementInstance.delete(token);
```

# Get API Information
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

[Read the full Documentation.](https://x0tf.github.io/x0js/)
