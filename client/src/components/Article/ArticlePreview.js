import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Badge } from "react-bootstrap";

class ArticlePreview extends Component {
  redirectToArticle = id => {
    console.log(id);
    this.props.history.push({ pathname: `/article/${id}` });
  };

  render() {
    return (
      <div>
        <div className="post-preview">
          <Link
            to="#"
            onClick={() => this.redirectToArticle(this.props.articleId)}
          >
            <h2 className="post-title">{this.props.articleTitle}</h2>
            <span style={{ display: "inline" }}>
              <h3 className="post-subtitle">{this.props.articleSubtitle}</h3>
            </span>
            <span style={{ display: "inline" }}>
              <Badge variant="info">{this.props.articleCategory}</Badge>
              &nbsp;
              {/* <Badge variant="info">{this.props.likes} Likes</Badge> */}
            </span>
          </Link>
          <p className="post-meta">
            Posted by &nbsp;
            <Link to="/about">{this.props.user}</Link>&nbsp; on{" "}
            {this.props.createdOn} &nbsp; {this.props.comments} Comments
          </p>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default withRouter(ArticlePreview);
