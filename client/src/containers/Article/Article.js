import React, { Component } from "react";
import ArticleHero from "../../components/ArticleHero/ArticleHero";
import { Container } from "react-bootstrap";

export default class Article extends Component {
  render() {
    return (
      <div>
        <ArticleHero title=" Man must explore, and this is exploration at its greatest" />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h2 className="post-title">
                Man must explore, and this is exploration at its greatest
              </h2>
            </div>
          </div>
        </div>

        <hr></hr>
      </div>
    );
  }
}
