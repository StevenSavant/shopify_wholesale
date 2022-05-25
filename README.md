# Shopify Wholesale Page

## Project Summary

This project builds a wholesale page for a shopify store and was created to support https://bricktactical.com/
Products information is imported via an AWS Lambda Function and placed in an S3 Bucket.
From there the React Front-End loads these products to display in a list to allow wholesale customer to select quantities of each product. 

Once complete, the Front-End allows wholesale customers to print an invoice for their order.

![Shopify Wholesale](/Shopify-Wholesale.png "Infrastructure Diagrame")


A demo of this page is viewable here (ask me for password access):
http://website-pocs.s3-website-us-east-1.amazonaws.com/


## Product Filtering

All Shopify vendor products are imported but only some are displayed on the wholesale page. 
For an item to appear in the wholesale page, it must have the following tags

- A wholesale tag as `Wholesale` indicating this item is available for wholesale
- A wholesale price with format `WSP 0.00` 
- A minimum quantity with format `MQTY 00`

Note: these tags are case-sensitive


## Wholesale Page

The React front end defines the page structure and pulls the item data from the local file `src/products.json` or S3 Bucket when deployed.
Items are not loaded into the UI until the page is unlocked.

## Product Importer

A python script is used to pull the product data at the vendor level from a shopify store. After the updated product data is placed in s3
the CloudFront Distribution's cache is invalidated.
See the `GetShopifyProductsLambda` for details



## Considerations

- To anyone seeing this, you may want to use lambda edge cases if you'd want this to scale further. 
- There is no way to do this dynamically pull the product data into a static-webpage in S3. S3 does not support server side scripting, and Shopify does not allow cross-origin api calls. There are many solutions to this, but the lambda importer was most cost effective. 

