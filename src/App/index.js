import React, { useContext, useState, useCallback, useEffect } from "react";

import Store from "providers/Store.js";

import Main from "./Main";

function App() {
  return (
    <Store>
      <Main></Main>
    </Store>
  );
}

export default App;
