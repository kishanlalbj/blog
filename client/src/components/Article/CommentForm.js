import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

class CommentForm extends Component {
  state = {
    commenterName: "",
    commentText: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onPostComment = () => {
    this.props.onPostComment(this.state.commentText, this.state.commenterName);
    this.setState({
      commenterName: "",
      commentText: ""
    });
  };

  render() {
    return (
      <div>
        <strong>
          <h4>Leave a comment</h4>
        </strong>

        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your (real) name"
              name="commenterName"
              value={this.state.commenterName}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>

            <FormControl
              name="commentText"
              value={this.state.commentText}
              placeholder="Your Comment"
              as="textarea"
              aria-label="With textarea"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.onPostComment}>
            Post Comment
          </Button>
          <p style={{ color: "red" }}>{this.props.message}</p>
        </Form>
        <br></br>
      </div>
    );
  }
}

export default CommentForm;
