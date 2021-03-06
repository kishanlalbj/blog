import React, { Component } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Draft extends Component {
  state = {
    page: 1,
    pagination: {},
    deleteId: "",
    confirmModal: false,
    drafts: [],
  };

  componentDidMount() {
    this.getDraftedArticles(this.state.page);
  }

  async getDraftedArticles(page) {
    let drafts;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };

    axios
      .get(`/api/articles/drafts?page=${page}&limit=5`, config)
      .then((response) => {
        // console.log(response);
        drafts = response.data;
        this.setState({ drafts: drafts.results, pagination: drafts });
      })
      .catch((err) => console.log(err));
    // let response = await fetch(`/api/articles/drafts?page=${page}&limit=5`);

    // let drafts = await response.json();
    // // console.log("DRAFTSSSSSS", drafts);
  }

  next = () => {
    let page = this.state.pagination.next.page;
    this.getDraftedArticles(page);
  };

  previous = () => {
    let page = this.state.pagination.previous.page;
    this.getDraftedArticles(page);
  };

  toggleConfirmModal = (id) => {
    let toggle = this.state.confirmModal;

    this.setState({ confirmModal: !toggle, deleteId: id });
  };

  handleEdit = (id) => this.props.history.push("/edit/" + id);
  deleteArticle = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };

    axios
      .get(`/api/articles/remove/draft/${this.state.deleteId}`, config)
      .then((response) => {
        this.getDraftedArticles(this.state.page);
        this.setState({
          confirmModal: false,
          deleteId: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // let response = await fetch(
    //   `/api/articles/remove/draft/${this.state.deleteId}`
    // );
    // let data = await response.json();
  };

  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "65px" }}
        ></div>
        <div style={{ height: "100vh" }}>
          <div className="container">
            <br></br>
            <h5>Draft Articles</h5>

            <Table responsive className="table table-striped" hover>
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Modified On</th>
                  <th>Created On</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.drafts.length !== 0 ? (
                  this.state.drafts.map((article) => {
                    return (
                      <tr key={article._id}>
                        <td>{article.articleTitle}</td>
                        <td>{article.articleCategory}</td>
                        <td>{moment(article.lastModifiedOn).calendar()}</td>
                        <td>
                          {moment(article.createdOn).format("ll,  HH:MM")}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEdit}
                            color="#333"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.handleEdit(article._id)}
                          />
                          &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.toggleConfirmModal(article._id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">
                      <center>No Drafts</center>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className="">
              <br></br>
              {this.state.pagination !== undefined &&
              this.state.pagination.previous !== undefined ? (
                <Button
                  variant="dark"
                  className="btn btn-primary float-left"
                  style={{ borderRadius: "122000px" }}
                  onClick={this.previous}
                >
                  <i className="fa fa-arrow-left"></i>
                </Button>
              ) : null}

              {this.state.pagination !== undefined &&
              this.state.pagination.next !== undefined ? (
                <Button
                  variant="dark"
                  className="btn btn-primary float-right"
                  style={{ borderRadius: "122000px" }}
                  onClick={this.next}
                >
                  <i className="fa fa-arrow-right"></i>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
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

export default Draft;
