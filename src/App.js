import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./routes/MainScreen";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<MainScreen></MainScreen>}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
