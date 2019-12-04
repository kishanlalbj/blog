import React, { Component } from "react";
import ArticleHero from "../../components/ArticleHero/ArticleHero";

import CommentForm from "../../components/Article/CommentForm";
import Axios from "axios";
import Comment from "../../components/Article/Comment";

export default class Article extends Component {
  state = {
    article: {},
    comments: [],
    commenterName: "",
    commentText: "",
    message: ""
  };

  componentDidMount() {
    // console.log(this.props.match.params.id);
    window.scrollTo(0, 0);

    fetch("/api/articles/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        let copyArticle = { ...this.state.article };
        copyArticle = data;
        this.setState({ article: copyArticle, comments: data.comments }, () => {
          // console.log("Articles", this.state.article);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postComment = (comment, name) => {
    // console.log("Posting Comment");
    let obj = {
      id: this.props.match.params.id,
      commenterName: name,
      commentText: comment
    };

    if (comment !== "" && name !== "") {
      Axios.post("/api/articles/comment", obj)
        .then(response => {
          let copyArticle = [...this.state.comments];
          copyArticle.push(response.data);
          this.setState(
            {
              comments: copyArticle,
              commenterName: "",
              commentText: "",
              message: ""
            },
            () => {
              // console.log("Articles", this.state.comments);
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ message: "Error in posting comment" });
    }
  };

  // giveLike = () => {
  //   let copy = { ...this.state.article };
  //   copy.likes++;
  //   this.setState({ article: copy }, () => {
  //     console.log("*************", this.state.article);
  //   });
  // };

  render() {
    const { article } = this.state;
    const comments = this.state.comments.reverse();
    return (
      <div>
        <ArticleHero
          articleTitle={article.articleTitle}
          articleSubtitle={article.articleSubtitle}
          author={article.author}
          createdOn={article.createdOn}
          articleCategory={article.articleCategory}
          likes={article.likes}
          comments={article.comments || [].length}
          giveLike={this.giveLike}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div
                dangerouslySetInnerHTML={{ __html: article.articleContent }}
              />
              <hr></hr>

              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 mx-auto">
                    <CommentForm
                      handleChange={this.handleChange}
                      commenterName={this.state.commenterName}
                      commentText={this.state.commentText}
                      onPostComment={this.postComment}
                      message={this.state.message}
                    />
                    {comments.map(comment => {
                      return <Comment comment={comment} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
