import React, { Component } from "react";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
Quill.register(
  {
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
  },
  true
);
class ArticleBuilder extends Component {
  state = {
    articleTitle: "",
    articleSubtitle: "",
    savedArticleId: "",
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
    articleCategory: "",
    articleCover: "",
    articleContent: "",
    author: "",
    show: false,
    message: "",
    showAlert: false,
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditor = (value) => {
    this.setState({ articleContent: value });
  };

  toggleModal = () => {
    let copy = this.state.show;
    this.setState({ show: !copy });
  };

  closeModal = (mode) => {
    this.setState({
      show: false,
    });
  };

  updateArticle = (id) => {
    let obj = {
      articleTitle: this.state.articleTitle,
      articleSubtitle: this.state.articleSubtitle,
      articleContent: this.state.articleContent,
      articleCategory: this.state.articleCategory,
      isPrivate: false,
      id,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    axios
      .post("/api/articles/update", obj, config)
      .then((response) => {
        this.toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveDraft = () => {
    const {
      articleTitle,
      articleSubtitle,
      articleContent,
      articleCategory,
    } = this.state;

    let newArticle = {
      articleTitle,
      articleSubtitle,
      articleCategory,
      articleContent,
      isPrivate: true,
      author: this.props.auth.user.name,
    };

    fetch("api/articles/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("SAVED DRAFT", data);
        this.setState({
          message: "Article Saved Successfully",
          savedArticleId: data._id,
        });
        this.toggleModal();
        this.props.history.push("/admin");
      })
      .catch((err) => {
        this.setState({ message: "Sorry. Your article cannot be saved" });
        console.log(err);
      });
  };

  postArticle = () => {
    const {
      articleTitle,
      articleSubtitle,
      articleContent,
      articleCategory,
      savedArticleId,
    } = this.state;

    let newArticle = {
      articleTitle,
      articleSubtitle,
      articleCategory,
      articleContent,
      author: this.props.auth.user.name,
    };

    if (savedArticleId.length !== 0) {
      this.updateArticle(savedArticleId);
    } else {
      fetch("/api/articles/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(newArticle),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ message: "Article Created Successfully" });
          this.toggleModal();
          this.props.history.push("/admin");
        })
        .catch((err) => {
          this.setState({ message: "Sorry. Your article cannot be posted" });
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "65px" }}
        ></div>

        <Container style={{ marginTop: "10px" }}>
          <h2>New Article</h2>
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
            <Button variant="primary" value="Create" onClick={this.postArticle}>
              Publish
            </Button>
            &nbsp;
            <Button variant="info" value="Save" onClick={this.saveDraft}>
              Save and Exit
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

        <Modal show={this.state.show} onHide={this.toggleModal}>
          <Modal.Header closeButton>Message</Modal.Header>

          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
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

export default connect(mapStateToProp)(withRouter(ArticleBuilder));
