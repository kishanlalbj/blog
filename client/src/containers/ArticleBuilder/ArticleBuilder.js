import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactQuill from "react-quill";

class ArticleBuilder extends Component {
  state = {
    text: ""
  };

  handleChange = value => {
    this.setState({ text: value });
  };

  postArticle = () => {
    console.log(this.state.text);
  };
  render() {
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
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="5">
                <Form.Control placeholder="Article Title" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Category
              </Form.Label>
              <Col sm={5}>
                <Form.Control placeholder="Category of the article" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Article Content
              </Form.Label>
              <Col sm="10">
                <ReactQuill
                  style={{ height: "50vh" }}
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
          </Form>
          <center style={{ clear: "both", marginTop: "50px" }}>
            <Button onClick={this.postArticle}>Submit</Button>
          </center>
        </Container>
        <br></br>
        <hr></hr>
      </div>
    );
  }
}

export default ArticleBuilder;
