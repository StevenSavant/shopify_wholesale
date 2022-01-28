function get_wholesale_price(tags) {
    var x = tags.match(/WSP \d+\.\d{1,2}/)
    return (x) ? x[0].substring(4) : "N/A"

}

function get_minimum_quantity(tags) {
    var x = tags.match(/MQTY \d+/)
    return (x) ? x[0].substring(5) : "10"
}

function has_wholesale_tag(tags) {
    return (tags) ? tags.includes("Wholesale") : false
}

function search_images(images, id) {
    for (const i of images) {
        if (i.id === id)
            return i
            
    }
    return null
}

/**
 * Reads-in raw json data from shopify products API and formates the products into an array. Variants become separate items in the array.
 * If there is no variant for a product entry, default item information is used instead.
 * @returns json of with `products` and `types` keys
 */
function read_in_products(productData) {
    var all_products = []
    var product_types = []
    var product

    console.log(`total products retrieved: ${productData.products.length}`)

    for (const item of productData.products) {

        //Skip anything without the 'Wholesale' tag
        if (!has_wholesale_tag(item.tags)) {
            continue
        }

        //Use base info if there are no variants
        if (!item.variants) {
            product = item
            product.price = "N/A"
            console.log(`This item has no variants, using default info`)

            product.WSP = get_wholesale_price(item.tags)
            product.MQTY = get_minimum_quantity(item.tags)
            all_products.push(product)
        }
        else {
            for (const variant of item.variants) {
                var image = search_images(item.images, variant.image_id)

                product = variant
                product.name = (variant.title !== "Default Title" ? `${item.title} (${variant.title})` : item.title)
                product.image = (!image) ? {'src' : item.image.src, 'isDefaultImage' : true } : image
                product.type = item.product_type

                product.WSP = get_wholesale_price(item.tags)
                product.MQTY = get_minimum_quantity(item.tags)
                all_products.push(product)
            }

            if (!product_types.includes(item.product_type) & !(product.type === '')) {
                product_types.push(item.product_type)
            }
        }

    }

    console.log(`read_in_products: Listing ${all_products.length} products`)
    const data = {
        products: all_products,
        types: product_types
    }
    return data
}

export default read_in_products