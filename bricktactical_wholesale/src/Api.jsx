// API handler functions
import buildConfigs from './config.json'
import localData from './products.json'

const axios = require('axios').default;
const environment = buildConfigs.environment
const product_file_url = buildConfigs.hostS3BucketUrl + '/' + buildConfigs.productsFile
const config_url = buildConfigs.hostS3BucketUrl + '/' + buildConfigs.S3ConfigFile

export function get_products(responseHandler) {

    if (environment === 'local-dev') {
        console.log("env: local-dev, using localData")
        responseHandler(localData)
        return null
    }

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

export function get_password(responseHandler) {
    axios.get(config_url)

    .then(function (response) {
      responseHandler(response.data)
    })
    .catch(function (error) {
      console.log('Validation Failed');
      responseHandler(false)
    })
    .then(function () {
      // always executed
    });
}