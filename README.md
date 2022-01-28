# Shopify Wholesale Page

## Project Summary

This project builds a wholesale page for a shopify store and was created to support https://bricktactical.com/
Products information is imported via an AWS Lambda Function and place in an S3 Bucket.
From there the React Front-End loads these products to display in a list to allow wholesale customer to select quantities of each product. 

Once complete, the Front-End allows wholesale customers to print an invoice for their order.

A demo of this page is viewable here:
http://website-pocs.s3-website-us-east-1.amazonaws.com/


# Product Filtering

All Shopify vendor products are imported but only some are displayed on the wholesale page. 
For an item to appear in the wholesale page, it must have the following tags

A wholesale tag as `Wholesale` indicating this item is available for wholesale
A wholesale price with format `WSP 0.00` 
A minimum quantity with format `MQTY 00`

As products are read in that meet these criteria, the various types are also noted to allow filtering in the main page. 

## Wholesale page

The React front end defines the page structure and pulls the item data form the local file `src/products.json` items are filtered in the UI to include only those under the `BrickTactical` vender and with the `Wholesale` tag attached to them. 

## GetShopifyProductsLambda

A python script is used to pull the product data at the vendor level from a 
shopify store. There is no way to do this dynamically from a static-webpage in S3 and deploying a server (or using other serverless features) would not be cost-effective for this use-case.

