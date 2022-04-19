import { Component } from "react"
import { Button, FormControl, Navbar, Container, Nav , NavDropdown} from 'react-bootstrap'


class NavBarWithSearch extends Component {

    handleFilterClick = (option) => this.props.handleTypeFilter(option.target.innerHTML)
    handleSearch = (event) => this.props.handleSearch(event.target.value)
    handleClick = () => this.props.handleCheckout()
    
    render() {
        return(
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Type Filter</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavDropdown title={this.props.typeLabel} id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={this.handleFilterClick}>
                            All
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        {
                            Object.keys(this.props.types).map(
                                (value, key) => (
                                    <NavDropdown.Item onClick={this.handleFilterClick} key={key}>
                                        {this.props.types[key]}
                                    </NavDropdown.Item>
                                )
                            )
                        }
                    </NavDropdown>
                </Nav>
                <div className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={this.handleSearch}
                    />
                    <Button type="submit" variant="outline-success" onClick={this.handleClick}>Checkout</Button>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
    }
}

export default NavBarWithSearch