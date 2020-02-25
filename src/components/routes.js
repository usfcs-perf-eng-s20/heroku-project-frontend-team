import React from "react";
import { Switch, Route } from "react-router-dom";
import HelloWorld from "./HelloWorld";
import Home from "./Home";
import Product from "./Product";
import Profile from "./Profile/";
import Search from "./Search";
import MyTop from "./MyTop";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/helloworld" component={HelloWorld} />
      <Route path="/product/:id" component={Product} />
      <Route path="/me" component={Profile} />
      <Route path="/search" component={Search} />
      <Route path="/top" component={MyTop} />
    </Switch>
  );
};

export default Routes;
