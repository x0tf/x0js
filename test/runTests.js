const { expect } = require('chai');
const { checkIfRedirect, checkIfPaste } = require('./testUtils');

const { Client, Namespace } = require('../dist/index');
const { Element } = require('../dist/@interfaces/Element');
const x0 = new Client;

let token;
let pasteelement;
let redirectelement;
let namespaceinstance;

const namespace = 'x0jsunittest'


describe('x0js Unit Tests', () => {

    it('The serverInfo() method should return an object with the keys: invites, production, version; where production is true', async () => {
      expect(await x0.serverInfo()).to.have.property('production').that.is.true;
    })


    it('Creating a new namespace should return an instance of the namespace class', async () => {
        let testNamespace = await x0.namespace.create(namespace);
        console.log(`   
          Token `, testNamespace.token)
        token = testNamespace.token;
        namespaceinstance = testNamespace;
        expect(testNamespace).to.be.instanceOf(Namespace);  
    })


    it('Trying to register a namespace that is already taken should return error that is instance of x0ApiError', async () => {
      try {
        let failingNamespace = await x0.namespace.create('420');
      } catch(e) {
        expect(e.message).to.equal('the given namespace ID is already taken')
        expect(e.name).to.equal('x0ApiError')
      }
    })
 
  
    it('Populating namespace with redirect element called "jsx0testredirect" and checking if the returned class is instance of element', async () => {
      const newRedirectElement = await namespaceinstance.elements.create({
        elementtype: 'redirect',
        data: 'https://github.com/x0tf/',
        key: 'xjstestredirect'
      })
      redirectelement = newRedirectElement;
      expect(newRedirectElement).to.be.instanceOf(Element);
    })
    
    
    it('Check if redirect was created properly, by requesting the link and checking the status code.', async () => {
      expect((await checkIfRedirect(namespace, 'xjstestredirect'))).to.be.true;
    })


    it('Delete the previously created redirect element "jsx0testredirect"', async () => {
      expect(await redirectelement.delete(token)).to.be.true;
    })

    it('Deleting the namespace instance should return true.', async () => {
      expect(await namespaceinstance.delete())
    })


})
