
export function sumTotal(cart) {
    var total = 0

    Object.keys(cart).map(
        (key, index) => (
            total = total + cart[key].itemTotal
        )
    )

    return total.toFixed(2)
}