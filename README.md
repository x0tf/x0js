# x0js

## Getting started

```js
const x0js = require('x0js')
const x0 = new x0js.Client() 

x0.elements.namespace.register('myfirstnamespace', (err, token) => {
    if (err) {
        // handle error
    } else {
        // do something with the returned token here
    }
})

```

another syntax would be

```js
const { Client } = require('x0js')
const x0 = new Client() 

try {
    // will throw an error if an error occurs while registering
    const token = await x0.elements.namespace.register('myseconnamespace')
    console.log(token)
} catch (e) {
    // if there was an error to catch, an error occured when 
    // trying to register the new namespace with x0
}
```