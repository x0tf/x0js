# x0js

[![Test](https://github.com/x0tf/x0js/actions/workflows/test.yml/badge.svg)](https://github.com/x0tf/x0js/actions/workflows/test.yml)

## Getting started

```js
const x0js = require('x0js')
const x0 = new x0js.Client() 

// if the token varibale is undefined an error occured or something else went wrong
const token = await x0.namespace.create('myfirstnamespace');
// the returned token will be required for all future operations
```

Now with your client and namespace created, lets explore some more methods of the NamespaceManager:

## NamespaceManager
This manager helps you deal with namespaces. The available methods are listed below:

### ResetToken
This simply returns the new token for the given namespace.
```js
const newToken = await x0.namespace.resetToken(token, 'myfirstnamespace');
console.log(newToken);
```

### GetAll
Returns an array with all elements that are saved under the given namespace.
```js
const allElements = await x0.namespace.getAll(token, 'myfirstnamespace');
console.log(allElements);
```

### Delete
Deletes the given namespace. Returns true if the operation was successful
```js
const success = await x0.namespace.delete(token, 'myfirstnamespace');
console.log(success);
```


## PasteManager

This manager is used to create and delete paste elements. There are essentially just 2 methods to the PasteManager.

### Create
```js
const key = await x0.paste.create(token, 'myfirstnamespace', 'A very creative text');
console.log('https://x0.tf/' + key);
```
If you want a custom key, just pass it in as last argument like so
```js
const specialKey = await x0.paste.create(token, 'myfirstnamespace', 'A very creative text', 'myspecialkey');
console.log('https://x0.tf/' + specialKey);
```

### Delete
```js
const success = await x0.paste.delete(token, key); // <- the key that was returned by the create method above
console.log(success) // true if the operation was successful
```

## RedirectManager
The RedirectManager also supports the 2 methods `create` and `delete`.

### Create
Let's start by creating a new redirect to `https://wikipedia.org/`.
```js
const redirectKey = await x0.redirect.new(token, 'myfirstnamespace', 'https://wikipedia.org/')
```
Let's now create the same redirect with a custom key. In this case 'wiki'.
```js
// customkey will be defined as 'wiki', if no error occured, or the key wasn't already taken
const customKey = await x0.redirect.create(token, 'myfirstnamespace', 'https://wikipedia.org/', 'wiki')
```
### Delete
```js
const success = await x0.redirect.delete(token, 'wiki')
console.log(success, '<- if this is true the wiki redirect was deleted')
```
