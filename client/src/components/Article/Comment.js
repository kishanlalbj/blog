import React, { useState } from "react";
import moment from "moment";
import { Card, Row, Col, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  // faReply,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

function Comment(props) {
  console.log(props.auth);

  const [toggleReply, setToggleReply] = useState(false);
  const [replyName, setReplyName] = useState(
    props.auth.isAuthenticated ? props.auth.user.name : ""
  );
  const [replyText, setReplyText] = useState("");

  const replyToComment = (commentId) => {
    if (replyText && replyName) {
      props.replyToComment(commentId, { replyName, replyText });
      if (!props.auth.isAuthenticated) setReplyName("");
      setReplyText("");
    } else {
      alert("Type your reply");
    }
  };

  return (
    <Card>
      <Card.Header>
        <strong>{props.comment.commenterName}</strong> -{" "}
        {moment(props.comment.createdOn).format("MMM D, YY h:mm a")}
        <div
          style={{
            float: "right",
          }}
        >
          &nbsp; &nbsp;
          {props.auth.isAuthenticated ? (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              color="crimson"
              onClick={() => props.deleteComment(props.comment._id)}
              icon={faTrash}
            />
          ) : null}
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>
          <p>{props.comment.commentText}</p>
          <Card.Link
            style={{
              cursor: "pointer",
              color: "blue",
            }}
            onClick={() => setToggleReply(!toggleReply)}
          >
            Replies ({props.comment.replies.length})
          </Card.Link>
          {toggleReply ? (
            <>
              <br></br>
              {props.comment.replies.map((reply) => (
                <>
                  <br></br>
                  <Card body>
                    <strong>{reply.name}</strong> - {reply.text}
                  </Card>
                </>
              ))}
            </>
          ) : null}
        </Card.Text>
      </Card.Body>

      {toggleReply ? (
        <Card.Body>
          <Form>
            <Row>
              <Col md={3} style={{ marginTop: "10px" }}>
                <FormControl
                  type="text"
                  disabled={props.auth.isAuthenticated}
                  placeholder="Your (real) name"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                ></FormControl>
              </Col>
              <Col md={8} style={{ marginTop: "10px" }}>
                <FormControl
                  type="text"
                  placeholder="Your Reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></FormControl>
              </Col>

              <Col md={1} sm={12}>
                <center>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer", marginTop: "15px" }}
                    onClick={() => replyToComment(props.comment._id)}
                    icon={faPaperPlane}
                  />
                </center>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      ) : null}
    </Card>
  );
}

const mapStateToProp = (state) => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err,
});

export default connect(mapStateToProp)(Comment);
