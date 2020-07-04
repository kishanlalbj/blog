import React, { Component } from "react";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class EditArticle extends Component {
  state = {
    articleTitle: "",
    articleCategories: [
      "Life",
      "Travel",
      "Romance",
      "Random Thoughts",
      "Life Style",
      "Retro",
      "Family",
      "Nature",
      "Fashion",
    ],
    articleContent: "",
    articleSubtitle: "",
    articleCategory: "",
    modal: false,
    message: "",
  };

  publish = () => {
    let obj = {
      articleTitle: this.state.articleTitle,
      articleSubtitle: this.state.articleSubtitle,
      articleContent: this.state.articleContent,
      articleCategory: this.state.articleCategory,
      isPrivate: false,
      createdOn: Date.now(),
      id: this.props.match.params.id,
    };

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };

    axios
      .post("/api/articles/update", obj, config)
      .then((response) => {
        this.setState({
          message: "Article Published Successfully",
        });
        this.toggleModal();
        this.props.history.push("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveChanges = () => {
    let obj = {
      articleTitle: this.state.articleTitle,
      articleSubtitle: this.state.articleSubtitle,
      articleContent: this.state.articleContent,
      articleCategory: this.state.articleCategory,
      id: this.props.match.params.id,
    };

    // console.log(obj);
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };

    axios
      .post("/api/articles/update", obj, config)
      .then((response) => {
        // console.log(response.data);
        this.setState({ message: "Article saved successfully" });
        this.toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModal = () => {
    let copy = this.state.modal;
    this.setState({ modal: !copy });
  };

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditor = (value) => {
    this.setState({ articleContent: value });
  };

  componentDidMount() {
    axios
      .get("/api/articles/" + this.props.match.params.id)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          articleTitle: response.data.articleTitle,
          articleSubtitle: response.data.articleSubtitle,
          articleContent: response.data.articleContent,
          articleCategory: response.data.articleCategory,
          isPrivate: response.data.isPrivate,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "65px" }}
        ></div>
        <Container style={{ marginTop: "10px" }}>
          <center>
            <h2>Edit Article</h2>
          </center>

          <Form>
            <Form.Row>
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Article Title"
                  value={this.state.articleTitle}
                  name="articleTitle"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                  placeholder="Article Subtitle"
                  value={this.state.articleSubtitle}
                  name="articleSubtitle"
                  onChange={this.handleChange}
                />
              </Col>

              <Col>
                <Form.Label> Category </Form.Label>
                <Form.Control
                  name="articleCategory"
                  value={this.state.articleCategory}
                  onChange={this.handleChange}
                  as="select"
                >
                  <option>Choose</option>
                  {this.state.articleCategories.map((cat, index) => {
                    return <option key={index}>{cat}</option>;
                  })}
                </Form.Control>
              </Col>
            </Form.Row>
            {/* <Form.Row>
              <Col>
                <Form.Label>Upload Cover Image</Form.Label>
                <Form.Control
                  type="file"
                  name="articleCover"
                  value={this.state.articleCover}
                ></Form.Control>
              </Col>
            </Form.Row> */}
            <br></br>
            <Form.Row>
              <Col>
                <Form.Label>Article Content</Form.Label>
                <ReactQuill
                  style={{ height: "50vh" }}
                  value={this.state.articleContent}
                  onChange={this.handleEditor}
                  formats={[
                    "font",
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "code-block",
                    "color",
                    "background",
                    "list",
                    "indent",
                    "align",
                    "link",
                    "image",
                    "clean",
                    "emoji",
                  ]}
                  modules={{
                    toolbar: [
                      [{ font: [] }, { header: ["Emojiss"] }],
                      [
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "code-block",
                      ],
                      [{ color: [] }, { background: [] }],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      [{ align: [] }],
                      ["emoji"],
                      ["link", "image"],
                      ["clean"],
                    ],
                    "emoji-toolbar": true,
                    "emoji-textarea": true,
                    "emoji-shortname": true,
                  }}
                />
              </Col>
            </Form.Row>
          </Form>
          <center style={{ clear: "both", marginTop: "50px" }}>
            {this.state.isPrivate ? (
              <Button variant="primary" onClick={this.publish}>
                Save and Publish
              </Button>
            ) : null}
            &nbsp;
            <Button
              variant="secondary"
              value="Create"
              onClick={this.saveChanges}
            >
              Save Changes
            </Button>
            &nbsp;
            <Link to="/admin">
              <Button variant="secondary" value="Discard">
                Cancel
              </Button>
            </Link>
          </center>
        </Container>

        <br></br>
        <hr></hr>

        <Modal show={this.state.modal} onHide={this.toggleModal}>
          <Modal.Header closeButton>Message</Modal.Header>

          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal}>Close</Button>
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

export default connect(mapStateToProp)(withRouter(EditArticle));
