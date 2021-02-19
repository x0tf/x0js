const { Client } = require('./dist/index');
const x0 = new Client({
    '420': '420_token'
});

x0.elements.namespace.register();
x0.elements.paste.new();

x0.elements.namespace.activate();

x0.elements.namespace.resetToken();

x0.elements.namespace.register('new')