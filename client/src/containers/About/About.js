import React, { Component } from "react";
import Hero from "../../components/Hero/Hero";

class About extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    bio: ""
  };

  componentDidMount() {
    fetch("/api/profile")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          bio: data[0].bio
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Hero isAbout={true} />
        <div className="container">
          <div className="row">
            <div
              className="col-lg-8 col-md-10 mx-auto"
              style={{
                fontFamily: "Lora"
              }}
            >
              <center>
                <h1>
                  {this.state.firstName} {this.state.lastName}
                </h1>
              </center>
              <p>{this.state.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
