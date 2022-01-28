import { Component } from 'react'
import { Modal, Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { get_password} from '../Api'

class PasswordView extends Component {

    constructor(props) {
        super(props)
        this.state = {validated: false}
    }

    handleChange = (event) => this.textInput = event.target.value
    setValidated= (value)  => this.setState({validated : value})
    handleClick = () => this.props.handleClose()

    validatePassword = (config) => {
        if (this.textInput === config.wholesale_password) {
            console.log("password is correct")
            this.props.handleClose()
        }
        else {
            console.log("password was incorrect")
        }
        this.setValidated(true);
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        get_password(this.validatePassword)
    }

    render() {
        return (
            <Modal
              show={this.props.showpage}
              backdrop="static"
              keyboard={false}
              id='PasswordView'
              size="lg"
              aria-labelledby="review-label"
              fullscreen={true}
            >
              <Modal.Header closeButton className="no-print">
                <Modal.Title id="review-label">
                    Brick Tactical Wholesale
                </Modal.Title>
              </Modal.Header>
              <Modal.Body id='PasswordViewBody'>
                    <Form noValidate validated={this.state.validated} id='passwordForm' onSubmit={this.handleSubmit}>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    isInvalid
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    onChange={this.handleChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please enter password
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Form.Text id="passwordHelpBlock" muted>
                                Here by mistake? continue to <a href="https://bricktactical.com">bricktactical.com</a>
                            </Form.Text>
                    </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit" form="passwordForm">
                 Submit
                </Button>
              </Modal.Footer>
            </Modal>
        )
    }
}

export default PasswordView