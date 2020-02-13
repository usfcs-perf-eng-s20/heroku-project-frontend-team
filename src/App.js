import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Search from "./components/Search";
import MyTop from "./components/MyTop";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/top">My top</Link>
          </li>
          <li>
            <Link to="/me">Profile</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/helloworld">
          <HelloWorld />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/me">
          <Profile />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/top">
          <MyTop />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
