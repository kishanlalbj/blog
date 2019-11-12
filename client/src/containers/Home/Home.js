import React, { Component } from "react";
import Hero from "../../components/Hero/Hero";
import ArticlePreview from "../../components/Article/ArticlePreview";
import { Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

class Home extends Component {
  state = {
    articles: [],
    page: 1,
    limit: 1,
    pagination: {}
  };

  getArticles = page => {
    axios
      .get(`/api/articles?page=${page}&limit=1`)
      // .then(response => response.json())
      .then(response => {
        console.log(response.data);

        if (response.data.results.length === 0) {
          this.setState({
            message: "No Articles Found"
          });
        } else {
          this.setState({
            articles: response.data.results,
            pagination: response.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getArticles(this.state.page);
  }

  openArticle = id => {
    this.props.history.push(`/article/${id}`);
  };

  next = () => {
    let page = this.state.pagination.next.page;
    this.getArticles(page);
  };

  previous = () => {
    let page = this.state.pagination.previous.page;
    this.getArticles(page);
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <Hero title="Article Title" />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {articles.map((article, index) => {
                return (
                  <ArticlePreview
                    onClick={() => this.openArticle(article._id)}
                    key={article._id}
                    articleId={article._id}
                    articleTitle={article.articleTitle}
                    articleSubtitle={article.articleSubtitle}
                    articleCategory={article.articleCategory}
                    user={article.author}
                    views={article.visits}
                    createdOn={moment(article.createdOn).format("LL")}
                  />
                );
              })}

              <div className="">
                {this.state.pagination.previous !== undefined ? (
                  <Button
                    className="btn btn-primary float-left"
                    onClick={this.previous}
                  >
                    &larr; Newer Posts
                  </Button>
                ) : null}

                {this.state.pagination.next !== undefined ? (
                  <Button
                    className="btn btn-primary float-right"
                    onClick={this.next}
                  >
                    Older Posts &rarr;
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default Home;
