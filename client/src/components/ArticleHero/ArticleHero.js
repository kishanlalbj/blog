import React, { Component } from "react";
import "./ArticleHero.css";
import moment from "moment";

class ArticleHero extends Component {
  render() {
    return (
      <div>
        <header
          className="masthead"
          style={{
            background:
              'url("https://wallup.net/wp-content/uploads/2017/03/28/270544-city-cityscape-Rio_de_Janeiro-Brazil-clouds-hill-sea-sunset-748x421.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh"
          }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="post-heading">
                  <h1>{this.props.articleTitle}</h1>
                  <h2 className="subheading">{this.props.articleSubtitle}</h2>
                  <span className="meta">
                    Posted by &nbsp;
                    <a href="#">{this.props.author}</a> &nbsp; on{" "}
                    {moment(this.props.createdOn).format("LL")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default ArticleHero;
