import React, { Component } from "react";
import { Button, Modal, DropdownButton, Dropdown } from "react-bootstrap";
import "../../containers/App.css";
import Login from "../Login/Login";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  state = {
    showLogin: false,
    isLoggedin: false,
    message: "",
    email: "",
    password: ""
  };

  toggleLogin = () => {
    let show = this.state.showLogin;

    this.setState({ showLogin: !show });
  };

  logout = () => {
    console.log(this.props.auth);
    this.props.logoutUser(this.props.history);
  };
  login = () => {
    let { email, password } = this.state;
    let userData = {
      email,
      password
    };
    this.props.loginUser(userData, this.props.history);
    console.log(this.props.auth);

    this.setState({
      isLoggedin: this.props.auth.isAuthenticated,
      message: "",
      email: "",
      password: "",
      showLogin: false
    });

    // fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ email, password })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     let copyIsLogged = this.state.isLoggedin;
    //     let copyMessage = this.state.message;
    //     this.setState(
    //       {
    //         isLoggedin: !copyIsLogged,
    //         message: "",
    //         email: "",
    //         password: "",
    //         showLogin: false
    //       },
    //       () => {
    //         const { pathname } = this.props.location;
    //         this.props.history.push(pathname);
    //       }
    //     );
    //   })
    //   .catch(err => {
    //     this.setState({
    //       message: "Invalid Credentials"
    //     });
    //   });
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log(this.props.auth);
  }
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              Scribbles
            </Link>
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

                {this.props.auth.isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Button
                        className="nav-link"
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white"
                        }}
                        onClick={this.logout}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Button
                      className="nav-link"
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        borderColor: "white"
                      }}
                      onClick={this.toggleLogin}
                    >
                      Login
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Modal show={this.state.showLogin} onHide={this.toggleLogin}>
          <Modal.Header closeButton>
            <center>
              <h4> Welcome back Admin...! </h4>{" "}
            </center>
          </Modal.Header>
          <Modal.Body>
            <Login onLogin={this.login} handleChange={this.handleChange} />
            {this.state.message}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err
});

export default connect(
  mapStateToProp,
  { loginUser, logoutUser }
)(withRouter(Navbar));
