import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import Navbar from "../components/NavBar/Navbar";
import jwt_decode from "jwt-decode";
import "./App.css";
import store from "../store";
import setAuthHeader from "../utils/setAuthHeader";
import Footer from "../components/Footer/Footer";
import Home from "./Home/Home";
import About from "./About/About";
import Admin from "./Admin/Admin";
import Article from "./Article/Article";
import ArticleBuilder from "./ArticleBuilder/ArticleBuilder";
import EditArticle from "./Admin/EditArticle";
import Profile from "./Profile/Profile";

import ResetPassword from "../components/Login/ResetPassword";
import "quill-emoji/dist/quill-emoji.css";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Draft from "./Draft/Draft";

if (localStorage.jwtToken) {
  //set Auth Token
  setAuthHeader(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set User
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // store.dispatch(clearCurrentProfile());
    // this.props.history.push("/login");
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/article/:id" component={Article} />
          <Route exact path="/edit/:id" component={EditArticle} />
          <Route exact path="/drafts" component={Draft} />
          <Route exact path="/add" component={ArticleBuilder} />
          {/* <Route exact path="/hbd" component={HBD} /> */}
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
