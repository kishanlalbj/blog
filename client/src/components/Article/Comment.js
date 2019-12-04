import React from "react";
import moment from "moment";
export default function Comment(props) {
  return (
    <div
      style={{
        border: "1px solid #d4d6d4",
        marginTop: "5px",
        marginBottom: "5px"
      }}
    >
      <div
        style={{
          color: "white",
          background: "#565458",
          padding: "10px"
        }}
      >
        <strong style={{ fontSize: "20px" }}>
          {props.comment.commenterName} -{" "}
        </strong>
        {moment(props.comment.createdOn).format("ll")}
      </div>
      <div style={{ padding: "10px" }}>
        <p>{props.comment.commentText}</p>
      </div>
    </div>
  );
}
