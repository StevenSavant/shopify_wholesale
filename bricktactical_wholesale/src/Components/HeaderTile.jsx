import { Component } from 'react'


class HeaderTile extends Component {
    render() { 
        return (
            <div className="row">
              <div className="col-sm">
                <div className="tableHeader">
                    <h4>Image</h4>
                </div>
              </div>
              <div className="col-sm">
              <div className="tableHeader">
                    <h4>Name</h4>
                </div>
              </div>
              <div className="col-sm">
                <div className="tableHeader">
                    <h4>Listed Price</h4>
                </div>
              </div>
              <div className="col-sm">
                <div className="tableHeader">
                    <h4>Wholesale Price</h4>
                </div>
              </div>
              <div className="col-sm">
                <div className="tableHeader">
                    <h4>Quantity (Qty)</h4>
                </div>
              </div>
            </div>
        );
    } 
}

export default HeaderTile
