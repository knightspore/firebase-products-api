const functions = require('firebase-functions')
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
var path = require('path')
const middleware = require('./middleware.js')

var fromTheseRssFeeds = [
    'https://marijuanasa.co.za/product-category/marijuana-seeds/feed/',
    'https://www.cannabist.co.za/cannabis-seeds/feed/',
    'https://www.biltongandbudz.co.za/shop/feed/',
    'https://thehighco.co.za/product-category/cannabis-seeds/feed/',
    'https://cbseeds.co.za/shop/feed/',
];

// ******** ROUTES ******** //
// Home Page
app.get('/', (request, response) => {
    // response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    response.status(200).sendFile(path.join(__dirname, '/dist/index.html'));
})

// Products List API
app.get('/api', async (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    response.json(await middleware.getListOf('products'))
});

app.get('/api/products', async (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    response.json(await middleware.getListOf('products'))
});

// Single Product API
app.get('/api/products/:item_id', async (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    response.json(await middleware.getById('products', request.params.item_id))
})

// Request Crawl Refresh
app.get('/api/refresh', (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    middleware.scrapeToDatabase(fromTheseRssFeeds, 'products')
    response.sendStatus(200)
})

// Cloud Function: Serve
exports.app = functions.https.onRequest(app);
