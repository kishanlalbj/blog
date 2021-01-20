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
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");

  const replyToComment = (commentId) => {
    if (replyText && replyName) {
      props.replyToComment(commentId, { replyName, replyText });
      setReplyName("");
      setReplyText("");
    } else {
      alert("Type your reply");
    }
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md={9}>
            <strong>{props.comment.commenterName}</strong> -{" "}
            {moment(props.comment.createdOn).format("MMM D, YYYY h:mm a")}
          </Col>
          <Col md={3}>
            <div
              style={{
                float: "right",
              }}
            >
              {/* <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => setToggleReply(!toggleReply)}
                icon={faReply}
              /> */}
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
          </Col>
        </Row>
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
              <Col md={3} style={{ marginTop: "5px" }}>
                <FormControl
                  type="text"
                  placeholder="Your (real) name"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                ></FormControl>
              </Col>
              <Col md={8} style={{ marginTop: "5px" }}>
                <FormControl
                  type="text"
                  placeholder="Your Reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></FormControl>
              </Col>
              <Col md={1} style={{ marginTop: "10px" }}>
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => replyToComment(props.comment._id)}
                  icon={faPaperPlane}
                />
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
