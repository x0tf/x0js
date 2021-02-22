const c = require('@aero/centra');

module.exports = {
    checkIfRedirect: async (namespace, key) => {
        return (await c('https://x0.tf/'+ namespace + '/' + key, 'GET').send()).statusCode === 307;
    }
}