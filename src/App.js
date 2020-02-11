import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/helloworld">
          <HelloWorld />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
