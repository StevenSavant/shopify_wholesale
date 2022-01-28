
products = {
    'products': [
        {
            "id": 4647014072389,
            "title": "212th Clone Trooper",
            "body_html": "<p data-mce-fragment=\"1\">Custom printed Clone trooper rigs!\u00a0<br data-mce-fragment=\"1\"></p>\n<ul data-mce-fragment=\"1\">\n<li data-mce-fragment=\"1\">High Quality Custom UV Printing on REAL LEGO PARTS on every side of the minifigure!</li>\n<li data-mce-fragment=\"1\">All printing is done here in the U.S.A!</li>\n</ul>",
            "vendor": "BrickTactical",
            "product_type": "Custom Figures",
            "created_at": "2021-01-03T11:27:42-08:00",
            "handle": "212th-clone-trooper",
            "updated_at": "2021-12-02T14:30:51-08:00",
            "published_at": "2021-01-03T19:14:18-08:00",
            "template_suffix": "",
            "status": "active",
            "published_scope": "web",
            "tags": "Wholesale",
            "admin_graphql_api_id": "gid://shopify/Product/4647014072389",
            "variants": [
                {
                    "id": 32020711276613,
                    "product_id": 4647014072389,
                    "title": "Default Title",
                    "price": "15.00",
                    "sku": "",
                    "position": 1,
                    "inventory_policy": "deny",
                    "compare_at_price": null,
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Default Title",
                    "option2": null,
                    "option3": null,
                    "created_at": "2021-01-03T11:27:42-08:00",
                    "updated_at": "2021-11-25T23:22:55-08:00",
                    "taxable": true,
                    "barcode": "",
                    "grams": 0,
                    "image_id": null,
                    "weight": 0.0,
                    "weight_unit": "lb",
                    "inventory_item_id": 33567352848453,
                    "inventory_quantity": 0,
                    "old_inventory_quantity": 0,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/32020711276613"
                }
            ],
            "options": [
                {
                    "id": 6099172950085,
                    "product_id": 4647014072389,
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Default Title"
                    ]
                }
            ],
            "images": [
                {
                    "id": 15291626979397,
                    "product_id": 4647014072389,
                    "position": 1,
                    "created_at": "2021-01-03T11:28:17-08:00",
                    "updated_at": "2021-01-03T11:28:18-08:00",
                    "alt": null,
                    "width": 2000,
                    "height": 2000,
                    "src": "https://cdn.shopify.com/s/files/1/0876/7136/products/IMG_0833.jpg?v=1609702098",
                    "variant_ids": [],
                    "admin_graphql_api_id": "gid://shopify/ProductImage/15291626979397"
                },
                {
                    "id": 15291627012165,
                    "product_id": 4647014072389,
                    "position": 2,
                    "created_at": "2021-01-03T11:28:17-08:00",
                    "updated_at": "2021-01-03T11:28:18-08:00",
                    "alt": null,
                    "width": 2100,
                    "height": 2100,
                    "src": "https://cdn.shopify.com/s/files/1/0876/7136/products/IMG_0834.jpg?v=1609702098",
                    "variant_ids": [],
                    "admin_graphql_api_id": "gid://shopify/ProductImage/15291627012165"
                }
            ],
            "image": {
                "id": 15291626979397,
                "product_id": 4647014072389,
                "position": 1,
                "created_at": "2021-01-03T11:28:17-08:00",
                "updated_at": "2021-01-03T11:28:18-08:00",
                "alt": null,
                "width": 2000,
                "height": 2000,
                "src": "https://cdn.shopify.com/s/files/1/0876/7136/products/IMG_0833.jpg?v=1609702098",
                "variant_ids": [],
                "admin_graphql_api_id": "gid://shopify/ProductImage/15291626979397"
            }
        },
        {
            "tags": "new, Wholesale",
            "name" : 'product2' 
        }
    ]
}

function has_wholesale_tag(item) {
    if (item.tags != undefined) {
        return item.tags.includes("Wholesale")
    }
    else {
        return false
    }
}

// const result = sample.products.filter(item => check_tags(item))
// console.log(result)



function read_in_products() {
    var all_products = []
    var product = {}

    for (const item of products.products) {

        if (has_wholesale_tag(item) == false) {
            continue
        }

        if (item.variants == undefined) {
            console.log(`No variants, using null info`)
            product = {"name": item.title, "price": "N/A", 'image': item.image}
            all_products.push(product)
            continue
        }

        else {
            for (const variant of item.variants) {

                product = {}
                var name = ""
                if (variant.title == "Default Title") {
                    name = `${item.title} (${variant.title})`
                }
                else {
                    name = item.title
                }
                console.log(`printing variant price ${variant.price}`)
                product = {"name": name, "price": variant.price, 'image': variant.image}
                all_products.push(product)
            }
        }
    }

    return all_products
}
// read_in_products()
//console.log(read_in_products())

images = [
    {
        "name": "image_1",
        "id": "123456789",
    },
    {
        "name": "image_2",
        "id": "987654321",
    },
    {
        "name": "image_3",
        "id": "5555555555",
    }
]

function search_images(images, id) {
    for (const i of images) {
        if (i.id == id) {
            return i
        }
    }
    return {}
}

console.log(search_images(images, "123456789"))
