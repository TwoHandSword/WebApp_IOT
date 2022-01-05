import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./routes/MainScreen";
import KakaoLoginAuth from "./routes/kakaoLoginAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<MainScreen></MainScreen>}
        ></Route>
        <Route
          path="/kakaoLogin"
          exact={true}
          element={<KakaoLoginAuth></KakaoLoginAuth>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
