import React from "react";

import Main from "./Main";

import Store from "providers/Store.js";

function App() {
  return (
    <Store>
      <Main></Main>
    </Store>
  );
}

export default App;
