import { Modal, Table} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print"
import { Component } from 'react';
import { InvoiceLogoFigure } from './LogoFigure'
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';

function formatName(fullName) {
    return fullName.replaceAll(' ', '_')
}

function getDate(format) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (format === 'file')
        today = mm + '-' + dd + '-' + yyyy;
    else
        today = mm + '/' + dd + '/' + yyyy;

    return today
}

const LineItem = (props) => {
    return (
        <tr>
            <td className="lineItemData">
                {props.item.name}
            </td>
            <td className="lineItemData">
                {props.item.sku}
            </td>
            <td className="lineItemData">
                ${props.item.unitPrice.toFixed(2)}
            </td>
            <td className="lineItemData">
                {props.item.quantity}
            </td>
            <td className="lineItemData">
                ${props.item.itemTotal.toFixed(2)}
            </td>
        </tr>
    )
}

const TotalRow = (props) => {
    return (
        <tr id='invoiceTotal'>
            <td className="lineItemData">
            </td>
            <td className="lineItemData">
            </td>
            <td className="lineItemData">
            </td>
            <td style={{textAlign : 'left'}}>
                Order Total
            </td>
            <td className="lineItemData">
                ${props.total}
            </td>
        </tr>
    )
}

const InvoiceAddress = () => {
    return (
        <div id='InvoiceAddressText'>
            <h1>INVOICE</h1>
            <p>
                <span style={{fontWeight:'bold'}}>BrickTactical</span> <br/>
                PO BOX 448 <br/>
                Fall City, Washington 98024<br/>
                United States<br/>
                Invoice Date: {getDate('invoice')}
            </p>
        </div>
    )
}

class RecieptView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fullName: '',
            companyEmail: ''
        }
    }

    handleClick = () => this.props.handleClose()
    handleSubmit = () => this.props.handlePrint()
    handleName = (event) => this.setState({fullName : event.target.value})
    handleEmail = (event) => this.setState({companyEmail : event.target.value})
    
    render() {
        return (
            <Modal
                show={this.props.showpage}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                id='InvoiceView'
                size="lg"
                aria-labelledby="review-label"
            >
            <Modal.Header closeButton className="no-print">
                <Modal.Title id="review-label">
                    Review Invoice
                </Modal.Title>
            </Modal.Header>
            <Form className="RequestorForm">
                <Row id='CustomerInfo'>
                    <Col>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="ex: John Norman" onChange={this.handleName} />
                    </Col>
                    <Col>
                        <Form.Label>Company Email</Form.Label>
                        <Form.Control type="text" placeholder="ex: business@discoeco.com" onChange={this.handleEmail} />
                    </Col>
                </Row>
            </Form>
            <div ref={el => (this.componentRef = el)} media="print">
                <Container fluid="md" style={{padding:'40px', paddingBottom: '0%'}} id='InvoiceDataContainer'>
                    <Row>
                        <Col>
                            <InvoiceLogoFigure figureId='invoiceLogo' imageId='invoiceImage' captionId="invoiceCaption" logo='/Brick-Tactical-Logo.png'/>
                        </Col>
                        <Col style={{textAlign : 'right'}}>
                            <InvoiceAddress/>
                        </Col>
                    </Row>
                    <Row>
                        <p>
                            Name: {this.state.fullName} <br/>
                            Email: {this.state.companyEmail}
                        </p>
                    </Row>
                </Container>
                <Modal.Body id='Invoice'>
                    <Table>
                        <thead id='InvoiceTableHeader'>
                            <tr>
                            <th scope="col">Item</th>
                            <th id='sku_header' scope="col">SKU</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.props.cartData).map(
                                    (key) => (
                                        <LineItem key={key} pid={key} item={this.props.cartData[key]}/>
                                    )
                                )
                            }
                            <TotalRow total={this.props.cartTotal}/>
                        </tbody>
                    </Table>
                    {/* <p id='invoiceTotal'>Order Total:${this.props.cartTotal}</p> */}
                </Modal.Body>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClick}>
                    Close
                </Button>
                <ReactToPrint
                    content={() => this.componentRef}
                    documentTitle={`${formatName(this.state.fullName)}_BrickTactical_Invoice_${getDate('file')}`}
                    removeAfterPrint
                    trigger={() => {
                        return (
                            <Button variant="primary">
                                Print Invoice
                            </Button>
                        )
                      }}
                />
            </Modal.Footer>
            </Modal>
        );
    }
}

export default RecieptView