from datetime import datetime
import boto3


def invalidate_object(filepath):
    timestamp = datetime.today().strftime('%Y-%m-%d-%H')
    invalidationID = f'CFINVALIDATION-{timestamp}'
    print(invalidationID)

    try:
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
            
    except Exception as e:
        print(f"Failed to invalidate with error: {e}")
    


def lambda_handler(event, context):
    """Lambda Entry Point
    :param event: event information from lambda trigger
    :type event: dict
    :param context: context data from lambda
    :type context: dict
    """
    print('Running Shopify Lambda...')
    invalidate_object('/index.html')


if __name__ == "__main__":
    """Entry point for local testing
    """
    invalidate_object('/products.json')

