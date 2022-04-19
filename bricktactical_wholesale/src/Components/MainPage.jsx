
import { Component } from 'react'
import React from 'react'
import ProductTile from "./ProductTile"
import HeaderTile from "./HeaderTile"
import RecieptView from './RecieptView';
import PasswordView from './PasswordView'
import read_in_products from '../Utils/read_in_products'
import { sumTotal } from '../Utils/sumTotal'
import NavBarWithSearch from './NavBar'
import { MainPageLogoFigure } from './LogoFigure'
import { get_products} from '../Api'
import buildConfigs from '../config.json'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            productData: {},
            productTypes: [],
            showModal: false,
            locked: (buildConfigs.environment === 'prod') ? true : false,
            searchType: "All",
            searchField: ''
        }
        this.cart = {}
    }

    setSearchText = (searchText) => this.setState({searchField : searchText})
    componentDidMount = () => get_products(this.importProductData)
    closeInvoice = () => this.setState({ showModal: false })
    preventRefresh = (event) => event.preventDefault();
    unlockPage = () => this.setState({ locked: false })

    importProductData = (data) => {
        var parsed_data = read_in_products(data)
        this.setState({
            productData : parsed_data.products,
            productTypes: parsed_data.types
        })
    }

    updateCart = (item, quantity) => {

        if (quantity === 0 || quantity < item.MQTY) {
            delete this.cart[`${item.id}`]
            console.log('removing from cart')
            return null
        }
        
        var wsp_value = parseFloat(item.WSP)
        if (wsp_value) {
            this.cart[`${item.id}`] = {
                'name' : item.name,
                'quantity' : quantity,
                'unitPrice' : wsp_value,
                'itemTotal' : (quantity * wsp_value),
                'sku' : (item.sku === '') ? item.id : item.sku
            }
        }
        else {
            console.log('Cannot add to cart without wholesale price')
        }
    }

    setSearchType = (searchType) => {
        this.setState({
            searchField : '',
            searchType : searchType
        })
    }

    checkDisplay = (item) => {
        var inCategory = false
        var inSearch = false

        if (this.state.locked)
            return 'none'

        if (this.state.searchType === "All")
            inCategory = true

        else if (!(item.type === '') && this.state.searchType.includes(item.type))
            inCategory = true

        if (this.state.searchField === '')
            inSearch = true

        else if (item.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
            inSearch = true
            
        return (inCategory && inSearch) ? 'flex' : 'none'
    }

    showReciept = (event) => {
        this.total = sumTotal(this.cart)
        this.setState({ showModal: true })
    }

    render() { 
        return (
        <div className="main">
             <iframe id="ifmcontentstoprint" media="screen" style={{height: "0px", width: "0px", position: "absolute"}}></iframe>
             <PasswordView showpage={this.state.locked} handleClose={this.unlockPage}/>
             <RecieptView 
                cartTotal={this.total} 
                cartData={this.cart} 
                showpage={this.state.showModal} 
                handleClose={this.closeInvoice} 
                handlePrint={this.printReciept}
             />
            <MainPageLogoFigure imageid='MainPageLogo'/>
            <NavBarWithSearch
                handleCheckout={this.showReciept}
                handleSearch={this.setSearchText}
                types={this.state.productTypes}
                handleTypeFilter={this.setSearchType}
                typeLabel={this.state.searchType}
            />
            <form onSubmit={this.preventRefresh}>
                <HeaderTile/>
                {
                    Object.keys(this.state.productData).map(
                        (key, index) => (
                            <ProductTile 
                                key={index} 
                                productEntry={this.state.productData[index]} 
                                handleChange={this.updateCart}
                                shouldDisplay={this.checkDisplay(this.state.productData[index])}
                                pageLock={this.state.locked}
                            />
                        )
                    )
                }
            </form>
        </div>
        );
    } 
}

export default MainPage