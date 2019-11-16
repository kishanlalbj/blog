import React, { Component } from "react";
import ArticleHero from "../../components/ArticleHero/ArticleHero";
import { Container } from "react-bootstrap";
import moment from "moment";
export default class Article extends Component {
  state = {
    article: {}
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    window.scrollTo(0, 0);

    fetch("/api/articles/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let copyArticle = { ...this.state.article };
        copyArticle = data;
        this.setState({ article: copyArticle }, () => {
          console.log(this.state.article);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        <ArticleHero
          articleTitle={article.articleTitle}
          articleSubtitle={article.articleSubtitle}
          author={article.author}
          createdOn={article.createdOn}
          articleCategory={article.articleCategory}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div
                dangerouslySetInnerHTML={{ __html: article.articleContent }}
              />
            </div>
          </div>
        </div>

        <hr></hr>
      </div>
    );
  }
}
