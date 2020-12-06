const ogs = require('open-graph-scraper')

exports.getImageFor = async (url) => {
    const options = { url: url}
    const imageUrl = ogs(options)
                        .then( async (data) => {
                            const { result } = await data;
                            return result.ogImage.url;
                        }).catch(error => {
                            console.error(error)
                        })

    return await imageUrl
}