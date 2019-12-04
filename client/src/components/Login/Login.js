import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={e => this.props.handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={e => this.props.handleChange(e)}
            />
          </Form.Group>
          <center>
            <Button variant="primary" onClick={this.props.onLogin}>
              Login
            </Button>
            &nbsp;
            <Link to="#">Forgot Password ?</Link>
          </center>
        </Form>
      </div>
    );
  }
}

export default Login;
