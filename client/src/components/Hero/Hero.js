import React, { Component } from "react";
import "../../containers/App.css";
import "./Hero.css";
import avatar from "../../assets/img/avatar.png";
import background from "../../assets/img/background.png";
import background1 from "../../assets/img/background1.jpg";

export default class Hero extends Component {
  render() {
    return (
      <div>
        <header className="masthead">
          <div
            className="overlay"
            style={
              !this.props.isEdit
                ? {
                    backgroundImage: `url('${background1}')`
                  }
                : {
                    backgroundImage: `url('${background}')`
                  }
            }
          ></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  {this.props.isAbout ? (
                    <div>
                      <img
                        style={{
                          backgroundColor: "white",
                          borderRadius: "4000px"
                        }}
                        src={avatar}
                        alt="avatar"
                        height="150"
                        width="150"
                      />
                    </div>
                  ) : (
                    <>
                      <h1>Scribbles</h1>
                      <span className="subheading">
                        Things inside my head are now here
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
