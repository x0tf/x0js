const assert = require('chai').assert;
const { expect } = require('chai');
const { checkIfRedirect } = require('./util');
const { Client } = require('../dist/index');
const x0 = new Client;

let token;
let namespace = 'mochatest10'

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
 }

describe('Namespace Manager', () => {
  describe('Creating Namespaces', () => {



    it('Creating a new namespace should return a string', async () => {
      let testToken = await x0.namespace.create(namespace);
      console.log(testToken)
      if (testToken) token = testToken
      expect(typeof token).to.equal('string');
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
  
  describe('Listing elements', function () {
    // setting the tiomeout to 69 seconds because of rate limits yknow
    this.timeout(69000);
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
    it('Check if redirect was created properly)', async () => {
      expect(await checkIfRedirect(namespace, 'test')).to.be.true;
    })
  });


})
