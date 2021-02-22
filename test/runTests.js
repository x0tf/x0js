const { expect } = require('chai');
const { checkIfRedirect } = require('./testUtils');
const { Client } = require('../dist/index');
const { x0ApiError } = require('../dist/util/errors');
const x0 = new Client;


describe('Namespace Manager', () => {
  
  
  let token;
  const namespace = 'x0jsunittest001'



    it('Creating a new namespace should return a string', async () => {
      try {
        let testToken = await x0.namespace.create(namespace);
        console.log(`Token `, testToken)
        if (testToken) token = testToken
        expect(typeof testToken).to.equal('string')  
      } catch(e) {
        expect(e).to.be.instanceOf(x0ApiError);
        expect(e.message).to.equal('the given namespace ID is already taken');
      }
    })

    it('Trying to register an already registered namespace should return an error', async () => {
      try {
        let anothertoken = await x0.namespace.create(namespace)
        if (anothertoken) token = anothertoken;
        expect(typeof anothertoken).to.equal('string');  
      } catch (e) {
        expect(e).to.be.instanceOf(x0ApiError);
        expect(e.message).to.equal('the given namespace ID is already taken');
      }
    })  
  
  
  
    // setting the tiomeout to 69 seconds because of rate limits yknow
    // this.timeout(69000);
    // it('Namespace Elements should be an empty array', async () => {
    //   let res = await x0.namespace.getAll(token, namespace)
    //   console.log(res)
    //   assert.typeOf(res, 'array')
    // })
    it('Populating namespace with element called "Test"', async () => {
      expect(await x0.redirect.create(token, namespace, 'https://x0.tf/', 'test')).to.equal('test');
    })

    it('Check if redirect was created properly)', async () => {
      expect(await checkIfRedirect(namespace, 'test')).to.be.true;
    })


})
