const assert = require('chai').assert;

const { Client } = require('../dist/index');
const x0 = new Client;

let token;
let namespace = 'mochatest5'

describe('Namespace Manager', () => {
  describe('Creating Namespaces', () => {
    it('Token should be a string', async () => {
      let testToken = await x0.namespace.create(namespace);
      console.log(testToken)
      if (testToken) token = testToken
      assert.typeOf(testToken, 'string')
    })

    it('Already registered namespace should return an error', async () => {
      let result;
      try {
        let res = await x0.namespace.create(namespace);
      } catch (e) {
        result = true;
      }
      assert.isTrue(result);
    })  
  });
  
  describe('Listing elements', () => {
    // it('Namespace Elements should be an empty array', async () => {
    //   let res = await x0.namespace.getAll(token, namespace)
    //   console.log(res)
    //   assert.typeOf(res, 'array')
    // })
    it('Populating namespace with element called "Test"', async () => {
      let res = await x0.redirect.create(token, namespace, 'https://x0.tf/', 'test')
      assert.equal(res, 'test')
    })
    // FIXME: rate limits are causing this test to fail
    it('Namespace should now have at least one elemnt', async () => {
      let res = await x0.namespace.getAll(token, namespace)
      console.log(res)
      assert.isAtLeast(res.length, 1);
    })
  });


})
