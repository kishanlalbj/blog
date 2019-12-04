import React, { Component } from "react";
import "./ArticleHero.css";
import { Link } from "react-router-dom";
import moment from "moment";
import Life from "../../assets/img/life.jpg";

class ArticleHero extends Component {
  state = {
    background: ""
  };

  // giveLike = () => {
  //   this.props.giveLike(!this.state.isLiked);
  // };

  render() {
    console.log(this.props.comments);
    return (
      <div>
        <header
          className="masthead"
          style={{
            background: `url(${Life})`,
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
                  <h2 className="subheading">
                    {this.props.articleSubtitle}
                  </h2>{" "}
                  <span className="meta">
                    Posted by &nbsp;
                    <Link to="/about">{this.props.author}</Link>
                    &nbsp; on {moment(this.props.createdOn).format(
                      "LL"
                    )} &nbsp; {this.props.comments.length} Comments
                    {/* <Link>
                      <i className="fa fa-heart" onClick={this.giveLike} />
                    </Link> */}
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
