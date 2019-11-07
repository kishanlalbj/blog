import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

import "./App.css";
import Footer from "../components/Footer/Footer";
import Home from "./Home/Home";
import About from "./About/About";
import Admin from "./Admin/Admin";
import Article from "./Article/Article";

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/article" component={Article} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
