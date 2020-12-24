import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Details from "./components/Details/Details";
import List from "./components/List/List";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/:ch_id" component={Details} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
