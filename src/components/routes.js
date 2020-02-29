import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home/";
import Product from "./Product/";
import Profile from "./Profile/";
import Search from "./Search/";
import MyTop from "./MyTop";
import TestMyTop from "./MyTop/MyTop";
import Status from "./Status/";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/me" component={Profile} />
      <Route path="/search" component={Search} />
      <Route path="/top" component={MyTop} />
      <Route path="/testTop" component={TestMyTop} />
      <Route path="/status" component={Status} />
    </Switch>
  );
};

export default Routes;
