import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import avatar from "../../assets/img/avatar.png";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

class Profile extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    bio: "",
    loader: 0,
    showModal: false,
    message: ""
  };

  componentDidMount() {
    // console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      fetch("/api/profile")
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          this.setState({
            id: data[0]._id,
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            avatar: data[0].avatar,
            email: data[0].email,
            bio: data[0].bio
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onSaveProfile = id => {
    let profile = {
      id: id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      bio: this.state.bio
    };
    // console.log(profile);
    axios
      .post("/api/profile/update", profile)
      .then(response => {
        // console.log(response.data);
        let copyModal = this.state.showModal;
        this.setState({
          id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          bio: response.data.bio,
          showModal: !copyModal,
          message: "Profile Updated Successfully"
        });
      })
      .catch(err => {
        this.setState({
          message: "Error in updated successfully"
        });
        console.groupEnd(err);
      });
  };

  toggleModal = () => {
    let copyModal = this.state.showModal;
    this.setState({
      showModal: !copyModal
    });
  };

  uploadImage = e => {
    // console.log(e.target.files[0]);
    console.log("Image upload");
    this.setState(
      {
        avatar: e.target.files[0],
        loading: 0
      },
      () => {
        // console.log(this.state.avatar);
      }
    );
  };

  updateImage = () => {
    const data = new FormData();
    data.append("profile", this.state.avatar);
    data.append("id", this.state.id);
    axios({
      method: "post",
      url: "/api/profile/upload",
      data: data,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        // console.log(response.data);
        this.setState({
          avatar: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "65px" }}
        ></div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                src={avatar}
                alt="avatar"
                style={{
                  borderRadius: "10000px"
                }}
                className="d-block img-fluid mb-3"
              />

              <input type="file" onChange={this.uploadImage} disabled />
              <br></br>
              <br></br>

              <button
                disabled
                onClick={this.updateImage}
                style={{ width: "66%" }}
                className="btn btn-danger"
              >
                upload
              </button>
            </div>
            <div className="col-md-9">
              {/* <h4>Edit Profile</h4> */}
              <div class="card">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="name">First Name</label>
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label for="name">Last Name</label>
                      <input
                        name="lastName"
                        type="text"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label for="email">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label for="bio">Bio</label>
                      <textarea
                        className="form-control"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                    <center>
                      <Button
                        className="btn btn-primary"
                        onClick={this.onSaveProfile.bind(this, this.state.id)}
                        variant="primary"
                      >
                        Save Changes
                        {/* <i className="fa-floppy-o"> </i> */}
                      </Button>
                      &nbsp;
                      <Link to="/admin">
                        <Button variant="secondary">Cancel</Button>
                      </Link>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.state.message}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.toggleModal} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
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

export default connect(mapStateToProp)(withRouter(Profile));
