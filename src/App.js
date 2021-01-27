import "./App.css";
import Home from "./page/home";
import { Login } from "./page/login";
import { Profile } from "./page/profile";
import ToDoDetail from "./page/todoDetail";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  // const [page, setPage] = useState("LOGIN");

  return (
    <Router>
      <Switch>
        <Route path="/todo/:slug">
          <ToDoDetail />
        </Route>
        <Route path="/todo/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
