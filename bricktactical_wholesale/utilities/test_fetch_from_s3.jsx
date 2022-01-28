// API handler functions
const axios = require('axios').default;

function get_products(responseHandler) {

    const product_file_url = 'http://website-pocs.s3-website-us-east-1.amazonaws.com/manifest.json'
    console.log(`API: Retrieving products: ${product_file_url}`)

    //TODO: use promise for "please wait, while loading" screen later
    axios.get(product_file_url)
    .then(function (response) {
      // TODO: Add repsonse headers from backend to log reponsonse 200
      console.log(`API: GetProducts: Response from S3: Status Code ${response.status}`);
      responseHandler(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log('ran into an error');
      responseHandler(false)
    })
    .then(function () {
      // always executed
    });
}

function responseDoIt(data) {
    console.log(data)
}


get_products(responseDoIt)
