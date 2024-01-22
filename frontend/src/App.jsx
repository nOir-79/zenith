import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./components/home_page.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};
export default App;
