import React, { Component } from "react";
import Hero from "../../components/Hero/Hero";
import {
  Container,
  Button,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{ backgroundColor: "black", height: "10vh" }}
        ></div>
        <Container>
          <div style={{ marginTop: "2%" }}>
            <h2 style={{ float: "left" }}> Dashboard </h2>
            <div style={{ float: "right" }}>
              <Button> Create Article</Button>
            </div>
          </div>

          <div style={{ clear: "both" }}>
            <InputGroup className="mb-3" style={{ borderRadius: "0px" }}>
              <FormControl
                placeholder="Search Articles"
                aria-label="Search Articles"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button id="basic-addon2">
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <h5>
              Total Articles: <span> 4 </span>
            </h5>

            <h5>
              Total Views: <span> 54 </span>
            </h5>
          </div>
        </Container>
        <div style={{ clear: "both" }}></div>
        <hr></hr>
      </div>
    );
  }
}
