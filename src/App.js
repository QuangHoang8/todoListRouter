import "./App.css";
import Home from "./page/home";
import { Login } from "./page/login";
import { Profile } from "./page/profile";
import ToDoDetail from "./page/todoDetail";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  const [nameLogin, setNameLogin] = useState("");

  const handleAddNameLogin = (name) => {
    setNameLogin(name);
  };
  return (
    <Router>
      <Switch>
        <Route path="/todo/:slug">
          <ToDoDetail />
        </Route>
        <Route path="/todo/">
          <Home name={nameLogin} />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Login addName={handleAddNameLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
