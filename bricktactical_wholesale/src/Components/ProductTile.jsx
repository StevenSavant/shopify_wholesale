
import { Component } from 'react'


function get_sku_or_id(item) {
    if (item.sku === '') return item.id
        return item.sku
}

class ProductTile extends Component {

    constructor(props) {
        super(props);
        this.state = { valid : true }
    }

    handleChange = (event) => {

        if (Number(event.target.value) === 0) {
            this.setState({valid : true})
        }
        else if (Number(event.target.value) < Number(this.props.productEntry.MQTY)) {
            console.log(`target value: ${event.target.value} is less than minimum ${this.props.productEntry.MQTY}`)
            this.setState({valid : false})
        }
        else {
            this.setState({valid : true})
        }

        event.preventDefault()
        this.props.handleChange(this.props.productEntry, Number(event.target.value))
    }

    render() { 
        return (
            <div className="row" style={{display: this.props.shouldDisplay}}>
              <div className="col-sm">
                {/* <img img="sample_image.jpeg" style={{ width: '80%' }}/> */}
                <div className="imageCell">
                    <img src={this.props.productEntry.image.src} alt={this.props.productEntry.id} style={{ width: '150px' }}/>
                </div>
              </div>
              <div className="col-sm">
                <div className="nameCell" style={{ margin: 'auto', position: "relative" }}>
                    <p>
                        {this.props.productEntry.name}<br/>
                        SKU: {get_sku_or_id(this.props.productEntry)}
                    </p>
                </div>
              </div>
              <div className="col-sm">
                <div className="priceCellMSRP">
                    <p>MSRP ${this.props.productEntry.price}</p>
                </div>
              </div>
              <div className="col-sm">
                <div className="priceCellWSP">
                    <p>WSP {(this.props.pageLock) || (this.props.productEntry.WSP === 'N/A') ? "N/A" : `$${this.props.productEntry.WSP}`}</p>
                </div>
              </div>
              <div className="col-sm">
                <div className="quantityCell">
                        <label>Qty:&nbsp;&nbsp;</label>
                        <input 
                            type="number"
                            name="quantity" 
                            min={this.props.productEntry.MQTY}
                            max="500"
                            onChange={this.handleChange}
                        />
                        <p style={{color : (this.state.valid) ? 'black' : 'red', fontWeight: (this.state.valid) ? '' : 'bold'}}>min. {this.props.productEntry.MQTY}</p>
                </div>
              </div>
            </div>
        );
    } 
}

export default ProductTile
