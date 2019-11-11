import React, { Component } from "react";
import Hero from "../../components/Hero/Hero";
import ArticlePreview from "../../components/Article/ArticlePreview";
import { Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

class Home extends Component {
  state = {
    articles: [],
    page: 0
  };

  componentDidMount() {
    axios
      .get("/api/articles")
      // .then(response => response.json())
      .then(response => {
        console.log(response.data);
        this.setState({ articles: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  openArticle = id => {
    this.props.history.push(`/article/${id}`);
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
                    user={article.author}
                    views={article.visits}
                    createdOn={moment(article.createdOn).format("LL")}
                  />
                );
              })}

              <div className="">
                <Button className="btn btn-primary float-left">
                  &larr; Newer Posts
                </Button>

                <Button className="btn btn-primary float-right">
                  Older Posts &rarr;
                </Button>
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
