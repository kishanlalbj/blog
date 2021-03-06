import React, { Component } from "react";
import { Modal, NavDropdown } from "react-bootstrap";
import "../../containers/App.css";
import Login from "../Login/Login";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/authActions";
// import avatar from "../../assets/img/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faUser,
  faSignOutAlt,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  state = {
    showLogin: false,
    isLoggedin: false,
    message: "",
    email: "",
    password: "",
  };

  toggleLogin = () => {
    let show = this.state.showLogin;

    this.setState({ showLogin: !show });
  };

  logout = () => {
    this.props.logoutUser(this.props.history);
  };

  login = () => {
    let { email, password } = this.state;
    let userData = {
      email,
      password,
    };
    this.props.loginUser(userData, this.props.history);

    this.setState({
      isLoggedin: this.props.auth.isAuthenticated,
      message: "",
      email: "",
      password: "",
      showLogin: false,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    // console.log(this.props.auth);
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
                {console.log("-----AVATAR-----", this.props.user)}
                {this.props.auth.isAuthenticated ? (
                  <>
                    <NavDropdown
                      title={
                        <img
                          src={
                            "http://www.gravatar.com/avatar/ea1b54256c03bb64e0d1b49c46de64e8?s=200&r=pg&d=mm"
                          }
                          width="24"
                          alt="avatar"
                        />
                      }
                      id="collasible-nav-dropdown"
                      className="nav-item"
                      color="white"
                      style={{
                        borderRadius: "99px",
                        color: "white",

                        fontWeight: "400",
                      }}
                    >
                      <NavDropdown.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to="/admin"
                        >
                          <FontAwesomeIcon icon={faDesktop} color={"#333"} />{" "}
                          Dashboard
                        </Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to="/drafts"
                        >
                          <FontAwesomeIcon icon={faFolderOpen} color={"#333"} />{" "}
                          Drafts
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                          to="/profile"
                        >
                          <FontAwesomeIcon icon={faUser} color={"#333"} />
                          &nbsp; Profile
                        </Link>
                      </NavDropdown.Item>

                      {/* <NavDropdown.Item>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%"
                          }}
                          to="/hbd"
                        >
                          <FontAwesomeIcon
                            icon={faBirthdayCake}
                            color={"#333"}
                          />{" "}
                          Birthday Wish
                        </Link>
                      </NavDropdown.Item> */}

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} color={"#333"} />{" "}
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                    {/* <li className="nav-item">
                      <Link to="/hdb" className="nav-link">
                        HBD
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        // style={{
                        //   color: "black",
                        //   backgroundColor: "white",
                        //   borderColor: "white"
                        // }}
                        onClick={this.logout}
                      >
                        Logout
                      </Link>
                    </li> */}
                  </>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      // style={{
                      //   color: "black",
                      //   backgroundColor: "white",
                      //   borderColor: "white"
                      // }}
                      onClick={this.toggleLogin}
                    >
                      Login
                    </Link>
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

const mapStateToProp = (state) => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err,
});

export default connect(mapStateToProp, { loginUser, logoutUser })(
  withRouter(Navbar)
);
