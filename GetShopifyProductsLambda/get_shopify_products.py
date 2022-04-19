
import os
import requests
import json
import boto3
from datetime import datetime

SHOPIFY_API_KEY = os.getenv('SHOPIFY_API_KEY', None)
SHOPIFY_SECRET_KEY = os.getenv('SHOPIFY_SECRET_KEY', None)
SHOPIFY_STORE_NAME = os.getenv('SHOPIFY_STORE_NAME', None)
SHOPIFY_VENDOR_FILTER = os.getenv('SHOPIFY_VENDOR_FILTER', None)
OUTPUT_LOCATION = os.getenv('OUTPUT_LOCATION', 'local')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME', 'website-pocs')
DEBUG = os.getenv('DEBUG', True)

def invalidate_object(filepath):
    # creatues uniuque up to 1 hour,  this prevents repeated calls
    timestamp = datetime.today().strftime('%Y-%m-%d-%H')
    invalidationID = f'CFINVALIDATION-{timestamp}'

    print(invalidationID)
    client = boto3.client('cloudfront')

    response = client.create_invalidation(
        DistributionId='ELEK0XZYF4MB8',
        InvalidationBatch={
            'Paths': {
                'Quantity': 1,
                'Items': [
                    filepath,
                ]
            },
            'CallerReference': invalidationID
        })

def get_store_data(shopify_store, api_key, secret_key, debug=False):
    backend_url = f'https://{shopify_store}.myshopify.com/admin/products.json?vendor={SHOPIFY_VENDOR_FILTER}'
    session = requests.Session()

    resp = session.get(backend_url, auth=(api_key, secret_key))
    results = []

    try:
        if debug:
            print(f'Fetching products from store: {shopify_store}')

        data = json.loads(resp.text)

        if 'products' in data:
            results = results + data['products']

            while 'next' in resp.links:
                
                if debug:
                    print(f'Fetching next page')

                next_url = resp.links['next']['url']
                resp = session.get(next_url, auth=(api_key, secret_key))
                data = json.loads(resp.text)
                results = results + data['products']
        else:
            print(f"Failed to retrieve products from store {shopify_store}:\n {data['errors']}")
            print(f"URL: {backend_url}")
            exit()
    
        return results

    except Exception as e:
        print(f"Failed to read products from shopify store {shopify_store}, {e}")
        exit()
    
    finally:
        session.close()


def update_s3_data(pdata):
    client = boto3.client('s3')
    endcoded_pdata = json.dumps(pdata).encode('utf-8')
    response = client.put_object(Body=endcoded_pdata, Key='products.json', Bucket=S3_BUCKET_NAME)
    return response


def main(debug=False):
    """Script Entry point
    """
    data = get_store_data(SHOPIFY_STORE_NAME, SHOPIFY_API_KEY, SHOPIFY_SECRET_KEY, debug=debug)
    results = {'products' : data}

    ## If running locally
    if OUTPUT_LOCATION == 'local':
        with open('products.json', 'w') as outFile:
            print('writing data to local file "products.json"')
            json.dump(results, outFile)
    else:
        print('writing data to s3 object "products.json"')
        update_s3_data(results)
    
    invalidate_object('/products.json')



# Per the AWS Best-Practice, Seperate lambda handler from main function to allow for better testing
def lambda_handler(event, context):
    """Lambda Entry Point
    :param event: event information from lambda trigger
    :type event: dict
    :param context: context data from lambda
    :type context: dict
    """
    print('Running Shopify Lambda...')
    main(DEBUG)


if __name__ == "__main__":
    """Entry point for local testing
    """
    main(True)