import React, { Component } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ArticleBuilder extends Component {
  state = {
    articleTitle: "",
    articleSubtitle: "",
    articleCategories: ["Life", "Travel", "Romance"],
    articleCategory: "",
    articleCover: "",
    articleContent: "",
    author: "kishanlalbj",
    show: false,
    message: ""
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditor = value => {
    this.setState({ articleContent: value });
  };

  toggleModal = () => {
    let copy = this.state.show;
    this.setState({ show: !copy });
  };

  postArticle = () => {
    const {
      articleTitle,
      articleSubtitle,
      articleContent,
      author,
      articleCategory,
      articleCategories
    } = this.state;

    let newArticle = {
      articleTitle,
      articleSubtitle,
      articleCategory,
      articleContent,
      author
    };

    console.log(newArticle);

    fetch("/api/articles/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArticle)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ message: "Article Created Successfully" });
        this.toggleModal();
      })
      .catch(err => {
        this.setState({ message: "Sorry. Your article cannot be posted" });
        console.log(err);
      });
  };

  render() {
    const {
      articleTitle,
      articleSubtitle,
      articleContent,
      author,
      articleCategory,
      articleCategories
    } = this.state;
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "10vh" }}
        ></div>
        <Container style={{ marginTop: "10px" }}>
          <center>
            <h2>New Article</h2>
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
                />
              </Col>
            </Form.Row>
          </Form>
          <center style={{ clear: "both", marginTop: "50px" }}>
            <Button variant="primary" value="Create" onClick={this.postArticle}>
              Create
            </Button>
            &nbsp;
            <Link to="/admin">
              <Button variant="secondary" value="Discard">
                Cancel
              </Button>
            </Link>
          </center>
        </Container>
        <Modal show={this.state.show} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.state.message}</p>
          </Modal.Body>

          <Modal.Footer>
            <Link to="/admin">
              <Button variant="secondary">Close</Button>
            </Link>
          </Modal.Footer>
        </Modal>
        <br></br>
        <hr></hr>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err
});

export default connect(mapStateToProp)(withRouter(ArticleBuilder));
