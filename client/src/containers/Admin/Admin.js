import React, { Component } from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class Admin extends Component {
  state = {
    articles: [],
    totalPosts: 0,
    page: 1,
    articleCategories: ["Life", "Romance", "Travel"],
    pagination: "",
    articleTitle: "",
    articleSubtitle: "",
    articleCategory: "",
    articleContent: "",
    deleteId: "",
    confirmModal: false,
    totalDrafts: 0,
  };

  getArticles(page) {
    axios
      .get(`/api/articles?page=${page}&limit=10`)
      // .then(response => response.json())
      .then((response) => {
        // console.log(response.data);

        if (response.data.results.length === 0) {
          this.setState({
            message: "No Articles Found",
          });
        } else {
          this.setState({
            articles: response.data.results,
            pagination: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  next = () => {
    let page = this.state.pagination.next.page;
    this.getArticles(page);
  };

  previous = () => {
    let page = this.state.pagination.previous.page;
    this.getArticles(page);
  };

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleConfirmModal = (id) => {
    let toggle = this.state.confirmModal;

    this.setState({ confirmModal: !toggle, deleteId: id });
  };

  deleteArticle = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    axios
      .post("/api/articles/delete", { id: this.state.deleteId }, config)
      .then((response) => {
        // console.log(response.data);
        let copy = [...this.state.articles];
        let id = this.state.deleteId;
        let newcopy = copy.filter(function (obj) {
          return obj._id !== id;
        });
        // console.log(newcopy);
        this.setState({
          confirmModal: false,
          deleteId: "",
          articles: newcopy,
        });
        this.getDashboardDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDashboardDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    axios
      .get("/api/admin/dashboard", config)
      .then((response) => {
        // console.log("COUNT", response.data);

        this.setState({
          totalPosts: response.data.public,
          totalDrafts: response.data.draft,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    // console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      // console.log("Hello");
      this.props.history.push("/");
    } else {
      this.getDashboardDetails();
      this.getArticles(this.state.page);
    }
  }

  render() {
    let { articles } = this.state;
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "65px" }}
        ></div>
        <Container>
          <div style={{ marginTop: "3%" }}>
            <h4 style={{ float: "left" }}> Dashboard </h4>
            <div style={{ float: "right" }}>
              &nbsp;
              <Link to="/add" style={{ marginBottom: "2%" }}>
                {/* <Button variant="dark"> Create </Button> */}

                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faPlusCircle}
                  size="2x"
                />
              </Link>
            </div>
          </div>
          <br></br>
          <div style={{ clear: "both", marginTop: "50px" }}>
            <div class="row">
              <div class="col-md-9">
                <div class="card" style={{}}>
                  <Table responsive class="table table-striped" hover>
                    <thead class="thead-dark">
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.length === 0 ? (
                        <tr>
                          <td colSpan="8">
                            <center>No Articles Found</center>
                          </td>
                        </tr>
                      ) : (
                        articles.map((article, index) => {
                          return (
                            <tr>
                              <td>{article.articleTitle}</td>
                              <td>{article.articleCategory}</td>
                              <td>{moment(article.createdOn).format("ll")}</td>
                              <td>
                                <Link to={"/article/" + article._id}>
                                  <i className="fas fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link to={"/edit/" + article._id}>
                                  <i className="fas fa-edit"></i>
                                </Link>
                              </td>
                              <td>
                                <Link
                                  onClick={this.toggleConfirmModal.bind(
                                    this,
                                    article._id
                                  )}
                                >
                                  <i color="red" className="fas fa-trash"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </Table>
                </div>
                <div className="">
                  <br></br>
                  {this.state.pagination.previous !== undefined ? (
                    <Button
                      className="btn btn-primary float-left"
                      style={{ borderRadius: "122000px" }}
                      onClick={this.previous}
                    >
                      <i className="fa fa-arrow-left"></i>
                    </Button>
                  ) : null}

                  {this.state.pagination.next !== undefined ? (
                    <Button
                      className="btn btn-primary float-right"
                      style={{ borderRadius: "122000px" }}
                      onClick={this.next}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card text-center text-white mb-3"
                  style={{
                    background: "#7c3296",
                  }}
                >
                  <div className="card-body">
                    <h3>Articles</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt"></i>{" "}
                      {this.state.totalPosts}
                    </h4>
                  </div>
                </div>

                <div className="card text-center bg-secondary text-white mb-3">
                  <div className="card-body">
                    <h3>Drafts</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder-open"></i>{" "}
                      {this.state.totalDrafts}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div style={{ clear: "both" }}></div>
        <hr></hr>

        <Modal show={this.state.confirmModal} onHide={this.toggleConfirmModal}>
          <Modal.Header closeButton>Confirm Delete</Modal.Header>

          <Modal.Body>Are you sure wanna delete ?</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.deleteArticle}>
              Confirm
            </Button>
          </Modal.Footer>
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

export default connect(mapStateToProp)(withRouter(Admin));
