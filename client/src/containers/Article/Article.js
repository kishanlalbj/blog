import React, { Component } from "react";
import ArticleHero from "../../components/ArticleHero/ArticleHero";

import CommentForm from "../../components/Article/CommentForm";
import Axios from "axios";
import Comment from "../../components/Article/Comment";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

export default class Article extends Component {
  state = {
    article: {},
    comments: [],
    commenterName: "",
    commentText: "",
    message: "",
  };

  componentDidMount() {
    // console.log(this.props.match.params.id);
    window.scrollTo(0, 0);

    fetch("/api/articles/" + this.props.match.params.id)
      .then((response) => response.json())
      .then((data) => {
        let copyArticle = { ...this.state.article };
        copyArticle = data;
        this.setState({ article: copyArticle, comments: data.comments }, () => {
          // console.log("Articles", this.state.article);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postComment = (comment, name) => {
    // console.log("Posting Comment");
    let obj = {
      id: this.props.match.params.id,
      commenterName: name,
      commentText: comment,
    };

    if (comment !== "" && name !== "") {
      Axios.post("/api/articles/comment", obj)
        .then((response) => {
          let copyArticle = [...this.state.comments];
          copyArticle.push(response.data);
          console.log("New Comment", response.data);
          this.setState(
            {
              comments: response.data.comments,
              commenterName: "",
              commentText: "",
              message: "",
            },
            () => {
              // console.log("Articles", this.state.comments);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ message: "Error in posting comment" });
    }
  };

  deleteComment = async (commentId) => {
    console.log("Called", commentId);

    let resp = await axios.delete("/api/articles/comment/delete", {
      data: {
        articleId: this.props.match.params.id,
        commentId: commentId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    console.log(resp);
    this.setState({ comments: resp.data.comments });
  };

  replyToComment = async (commentId, replyObj) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    };
    console.log("Comment", commentId, replyObj);

    let resp = await axios.post(
      "/api/articles/comment/reply",
      {
        articleId: this.props.match.params.id,
        commentId: commentId,
        replyObj: {
          name: replyObj.replyName,
          text: replyObj.replyText,
        },
      },
      config
    );
    console.log(resp.data);

    this.setState({ comments: resp.data.comments });
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

                    <Row>
                      {comments.map((comment) => {
                        return (
                          <Col key={comment._id} md={12}>
                            <Comment
                              comment={comment}
                              deleteComment={this.deleteComment}
                              replyToComment={this.replyToComment}
                            />
                            <br></br>
                          </Col>
                        );
                      })}
                    </Row>
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
