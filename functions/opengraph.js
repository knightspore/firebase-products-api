const ogs = require('open-graph-scraper')

const options = { url: 'ciaran.co.za/tailwind-css-wordpress-theme-tutorial/'}


ogs(options)
  .then((data) => {
    const { result } = data;
    console.log('result:', result); // This contains all of the Open Graph results
    return result;
  }).catch(error => {
      console.error(error.ogImage)
  })