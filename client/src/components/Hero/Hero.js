import React, { Component } from "react";
import "../../containers/App.css";
import "./Hero.css";

export default class Hero extends Component {
  render() {
    return (
      <div>
        <header className="masthead">
          <div
            className="overlay"
            style={{
              backgroundImage:
                "url('https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2019/07/bookclub_books.jpg?itok=2SzTuHtL&c=600b9519ec8cb0bccd5176301c4067b1')"
            }}
          ></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Scribbles</h1>
                  <span className="subheading">
                    Things inside my head are now here
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
