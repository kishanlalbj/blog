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
            <h2 className="post-title">{this.props.articleTitle}</h2>{" "}
            <span style={{ display: "inline" }}>
              <h3 className="post-subtitle">{this.props.articleSubtitle}</h3>
            </span>
            <span style={{ display: "inline" }}></span>
          </Link>
          <p className="post-meta">
            Posted by &nbsp;
            <a href="#">{this.props.user}</a>&nbsp; on {this.props.createdOn}{" "}
            <Badge variant="info">{this.props.views} views</Badge>
          </p>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default withRouter(ArticlePreview);
