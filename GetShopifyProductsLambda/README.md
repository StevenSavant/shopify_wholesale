
# GetShopifyProductsLambda
This script defines a lambda function for pulling product information froma shopify store and placing the imported data as a json object
in an S3 Bucket

## Environment Variables
```
SHOPIFY_API_KEY: Shopify API Key
SHOPIFY_SECRET_KEY: Shopify API Secret Key
SHOPIFY_STORE_NAME: Name of the Shopify Store
SHOPIFY_VENDOR_FILTER: Filters products to import to specific vendor listing
OUTPUT_LOCATION: If set to 'local' a file be created 'products.json', this is used for testing
S3_BUCKET_NAME: name of the S3 bucket where the produts.json file should be added to. This assumes the bucket is in the same account as the lambda function.
DEBUG: Enable detailed logging. Off by default to reduce log generated (and cost)
```
