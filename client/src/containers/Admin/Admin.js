import React, { Component } from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Table,
  InputGroup,
  FormControl,
  Modal
} from "react-bootstrap";
import axios from "axios";

class Admin extends Component {
  state = {
    articles: [],
    totalPosts: 0,
    page: 1,
    pagination: ""
  };

  componentDidMount() {
    console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      console.log("Hello");
      this.props.history.push("/");
    } else {
      // fetch("/api/articles")
      //   .then(response => response.json())
      //   .then(articles => {
      //     console.log(articles);
      //     this.setState({ articles });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      axios
        .get("/api/admin/dashboard")
        .then(response => {
          console.log("COUNT", response.data);

          this.setState({
            totalPosts: response.data.totalArticles
          });
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(`/api/articles?page=${this.state.page}&limit=1`)
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
    }
  }

  render() {
    let { articles } = this.state;
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
              <Link to="/profile">
                <Button variant="warning"> Edit Profile </Button>
              </Link>
              &nbsp;
              <Link to="/add">
                <Button> Create Article </Button>
              </Link>
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

            <div class="row">
              <div class="col-md-9">
                <div class="card">
                  {/* <div class="card-header">
                    <h4>Latest Posts</h4>
                  </div> */}
                  <Table responsive class="table table-striped">
                    <thead class="thead-dark">
                      <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{article.articleTitle}</td>
                            <td>{article.articleCategory}</td>
                            <td>{moment(article.createdOn).format("ll")}</td>
                            <td>
                              <Link to={"/article/" + article._id}>
                                <i class="fas fa-eye"></i> View
                              </Link>
                            </td>
                            <td>
                              <Link to={"/article/" + article._id}>
                                <i class="fas fa-edit"></i> Edit
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center bg-primary text-white mb-3">
                  <div class="card-body">
                    <h3>Posts</h3>
                    <h4 class="display-4">
                      <i class="fas fa-pencil-alt"></i> {this.state.totalPosts}
                    </h4>
                  </div>
                </div>

                <div class="card text-center bg-success text-white mb-3">
                  <div class="card-body">
                    <h3>Views</h3>
                    <h4 class="display-4">
                      <i class="fas fa-eye"></i> 234
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div style={{ clear: "both" }}></div>
        <hr></hr>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err
});

export default connect(mapStateToProp)(withRouter(Admin));
