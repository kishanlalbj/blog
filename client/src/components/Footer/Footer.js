import React, { Component } from "react";
import "../../containers/App.css";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          className="copyright text-muted"
          style={{
            backgroundColor: "#565458"
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    {/* <a href="#">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                      </span>
                    </a> */}
                    {/* Designed by Kishanlal */}
                  </li>
                  <li className="list-inline-item">
                    {/* <a href="#">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                      </span>
                    </a> */}
                  </li>
                  <li className="list-inline-item">
                    {/* <a href="#">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                      </span>
                    </a> */}
                  </li>
                </ul>
                <p className="copyright" style={{ color: "white" }}>
                  Copyright &copy; Scribble 2020
                </p>
                <p className="copyright" style={{ color: "white" }}>
                  v1.3.1
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
