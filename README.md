# Brick Tactial Wholesale

This react project is builds the wholesale customer page for https://bricktactical.com/

This page is hosted in an AWS S3 Bucket:
http://website-pocs.s3-website-us-east-1.amazonaws.com/

## Wholesale page
The React front end defines the page structure and pulls the item data form the local file `src/products.json` items are filtered in the UI to include only those under the `BrickTactical` vender and with the `Wholesale` tag attached to them. 

## Lambda Scripts
`get_products_from_shopify.py`
A python script is used to pull the product data from for the vendor from thier 
shopify store. There is no way to do this dynamically from a static-webpage in S3 and deploying a server (or using other serverless features) would not be cost-effective for this use-case.

