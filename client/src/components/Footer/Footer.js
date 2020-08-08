import React, { Component } from "react";
import "../../containers/App.css";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          className="copyright text-muted"
          style={{
            backgroundColor: "#333",
            padding: "80px"
          }}
        >
          <div className="container">
            <center>
              <p className="copyright">Copyrights @ 2020</p>
              <p className="copyright">Scribbles v1.5.7</p>
            </center>
          </div>
        </footer>
      </div>
    );
  }
}
