const { expect } = require('chai');
const { checkIfRedirect } = require('./testUtils');
const { Client } = require('../dist/index');
const { Element } = require('../dist/@interfaces/Element');
const x0 = new Client;


describe('x0jsunittest', () => {
  
  
  let token;
  let redirectelement;
  const namespace = 'x0jsunittest002'
  



    it('The serverInfo() method should return an object with the keys: invites, production, version; where production is true', async () => {
      expect(await x0.serverInfo()).to.have.property('production').that.is.true;
    })


    it('Creating a new namespace should return a string', async () => {
      try {
        let testToken = await x0.namespace.create(namespace);
        console.log(`Token `, testToken)
        if (testToken) token = testToken
        expect(typeof testToken).to.equal('string')  
      } catch(e) {
        expect(e.message).to.equal('the given namespace ID is already taken');
      }
    })

    it('Trying to register an already registered namespace should return an error', async () => {
      try {
        let anothertoken = await x0.namespace.create(namespace)
        if (anothertoken) token = anothertoken;
        expect(typeof anothertoken).to.equal('string');  
      } catch (e) {
        expect(e.message).to.equal('the given namespace ID is already taken');
      }
    })  
  
    it('Populating namespace with redirect element called "jsx0testredirect" and checking if the returned class is instance of element', async () => {
      const newRedirectElement = await x0.elements.create(token, {
        elementtype: 'redirect',
        namespace,
        data: 'https://github.com/x0tf/',
        key: 'jsx0testredirect'
      })
      redirectelement = newRedirectElement;
      console.log(`
        ===============[CONSOLE OUPUT]===============
      `)

      console.log(newRedirectElement)
      
      console.log(`
        ===============[CONSOLE OUPUT]===============
      `)
      expect(newRedirectElement).to.be.instanceOf(Element);
    })

    it('Check if redirect was created properly, by requesting the link and checking the status code.', async () => {
      expect(await checkIfRedirect(namespace, 'jsx0testredirect')).to.be.true;
    })

    it('Delete the previously created redirect elemnt "jsx0testredirect"', async () => {
      expect(await redirectelement.delete(token)).to.be.true;
    })



    it('Deleting namespace should return true.', async () => {
      expect(await x0.namespace.delete(token, namespace))
    })


})
