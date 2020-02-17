import React from "react";
import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from './routes';

import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
}

export default App;
