

// function check_value(x) {
//     if (x == '1') {
//         return 5
//     }
//     return null
// }

// var title = "Windy Sale"
// var title2 = "Black"
// var j = '0'

// var pname = (title != "Default Title" ? `${title} (${title2})` : title)
// var iname = (a => a + 100)

function get_wholesale_price(tags) {

    var x = tags.match(/WSP \d+\.\d{1,2}/)
    if (x[0]) {
        wsp_value = x[0].substring(4)
        return wsp_value
    }
    else {
        return "N/A"
    }
}

function get_minimum_quantity(tags) {

    var x = tags.match(/MQTY \d+/)
    if (x[0]) {
        mqty = x[0].substring(5)
        return mqty
    }
    else {
        return "10"
    }
}

var pitem = {}
pitem.tags = "Wholesale, something else, WSP 5667.00, MQTY 50"


wsp_ = get_wholesale_price(pitem.tags)
mqty_ = get_minimum_quantity(pitem.tags)
console.log(wsp_)
console.log(mqty_)