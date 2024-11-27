import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import MainScreen from "./screens/MainScreen";
import MovieDetail from "./components/MovieDetail";
import LoginScreen from "./screens/login/LoginScreen";
import FindId from "./screens/login/FindId";
import FindPassword from "./screens/login/FindPassword";
import Signup from "./screens/login/Signup";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
  );
};

export default App;



