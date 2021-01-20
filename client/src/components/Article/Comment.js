import React from "react";
import moment from "moment";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Comment(props) {
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
              {/* <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faReply} /> */}
              &nbsp; &nbsp;
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                color="crimson"
                onClick={() => props.deleteComment(props.comment._id)}
                icon={faTrash}
              />
            </div>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Card.Text>
          <Row>
            <Col md={8}>{props.comment.commentText}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
