import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";

import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
}

export default App;
