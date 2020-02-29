import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";

import "./App.scss";

import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
}

export default App;
