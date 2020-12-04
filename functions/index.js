const functions = require('firebase-functions')
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const scripts = require('./scripts.js')
var path = require('path');

var onTheseRSSFeeds = [
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

// Products API
app.get('/api', async (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    response.json(await scripts.returnApiFor('products'))
});

// Request Crawl Refresh
app.get('/api/refresh', (request, response) => {
    response.set('Cache-control', 'public, max-age=300, s-maxage=600')
    scripts.scrapeToDatabase(onTheseRSSFeeds)
    response.sendStatus(200)    
})

// Cloud Function: Serve
exports.app = functions.https.onRequest(app);
