const scraper = require('rss-products-parser')  
const database = require('./database.js')

// Clean Scrape Results to Create a Simple Product List
createProductListFrom = (resultsJson) => {
    var ref = []
    for (let count = 0; count < resultsJson.length; count++) {
        for (let i = 0; i < resultsJson[count]['items'].length; i++) {
            var currentItem = resultsJson[count]['items'][i]
            ref.push(currentItem)
        }
    }
    return ref
}

// Notifications
notify = (msg) => {
    console.log(msg);
}

// ******** EXPORTS ******* //

// Request Logger
exports.log = (request) => {
    var d = new Date();
    console.log({
        "New Request": {    
            'path': request.path,
            'from_ip': request.ip,
            'time': d.toLocaleTimeString(),
            'cookies': request.cookies
        }
    })
}

// Parse RSS URLs into JSON
exports.scrapeToDatabase = async function (urlList) {
    notify('\nRe-running Crawl...')
    
    var ref = await scraper.run(urlList)
    notify('\nCrawl Complete. Updating database...')

    database.setCollection('products', createProductListFrom(ref))
}

exports.returnApiFor = async (collection) => {
    return await database.getCollection(collection);
}