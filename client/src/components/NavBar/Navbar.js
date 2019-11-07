import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../../containers/App.css";
import Login from "../Login/Login";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    showLogin: false,
    isLoggedin: true,
    message: "",
    username: "",
    password: ""
  };

  toggleLogin = () => {
    console.log(this.state.showLogin);
    let show = this.state.showLogin;
    this.setState({ showLogin: !show });
  };

  login = () => {
    console.log("Login");
    if (
      this.state.username === "test@gmail.com" &&
      this.state.password === "test"
    ) {
      let copyIsLogged = this.state.isLoggedin;
      let copyMessage = this.state.message;
      this.setState({ isLoggedin: !copyIsLogged, message: "Successfully" });
    } else {
      this.setState({
        message: "Invalid Credentials"
      });
    }
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            <a className="navbar-brand" href="index.html">
              Scribbles
            </a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/article" className="nav-link">
                    Article
                  </Link>
                </li>

                <li className="nav-item">
                  <Button
                    className="nav-link"
                    style={{
                      color: "white",
                      backgroundColor: "transparent"
                      // borderColor: "transparent"
                    }}
                    onClick={this.toggleLogin}
                  >
                    Login
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Modal show={this.state.showLogin} onHide={this.toggleLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login onLogin={this.login} />
            {this.state.message}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Navbar);
