const c = require('@aero/centra');

module.exports = {
    checkIfRedirect: async (namespace, key) => {
        return (await c('https://x0.tf/'+ namespace + '/' + key, 'GET').send()).statusCode === 307;
    },
    checkIfPaste: async (namespace, key, expectedContent) => {
        return(await c('https://x0.tf/' + namespace + '/' + key, 'GET').send()).body.toString() === expectedContent;
    }
}