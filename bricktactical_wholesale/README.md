# Front-End

##### Build guild

The `src/config.json` defines environment build variables as followed
```
{
    "environment" : "prod",
    "productsFile" : "products.json",
    "S3ConfigFile" : "config.json",
    "hostS3BucketUrl" : "http://website-pocs.s3-website-us-east-1.amazonaws.com"
}
````

setting `environment` to anything other "prod" remove the lock screen and read from a local `src/products.json` file instead.
This is for isolated testing during development

the `hostS3BucketUrl` defines the static S3 bucket where the font-end is hosted.
This can also be a CloudFront Distribution endpoint.


##### Deployment Guide

`npm run build` to create the build package. upload it's content to the target S3 bucket
`aws s3 cp build s3://website-pocs/ --recursive`

##### Update Product Listing
`aws lambda invoke --function-name get_shopify_products output.txt`