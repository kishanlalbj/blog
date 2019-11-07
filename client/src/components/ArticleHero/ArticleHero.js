import React, { Component } from "react";
import "./ArticleHero.css";

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
            backgroundSize: "cover"
          }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="post-heading">
                  <h1>
                    Man must explore, and this is exploration at its greatest
                  </h1>
                  <h2 className="subheading">
                    Problems look mighty small from 150 miles up
                  </h2>
                  <span className="meta">
                    Posted by
                    <a href="#">Start Bootstrap</a>
                    on August 24, 2019
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
