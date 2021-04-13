const NodeCache = require('node-cache')

const cache = new NodeCache();

module.exports = duration => (request, response, next) => {

    // is request a GET?
    // if not, call next
    if (request.method !== 'GET') {
        console.error('Cannot cache non-GET methods');
        return next();
    }
    // check if key exists in cache
    const key = request.originalUrl;
    const cachedResponse = cache.get(key)
    // if it exists, send cache result
    if (cachedResponse) {
        console.log(`Cache hit for ${key}`)
        response.send(cachedResponse)
    } else {
        console.log(`Cache miss for ${key}`)
        response.originalSend = response.send
        response.send = body => {
            response.originalSend(body)
            cache.set(key, body, duration);
        };
        next();
    }
    // if not, replace .send with method to set response to cache

}