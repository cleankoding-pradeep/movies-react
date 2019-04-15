import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NotFound from "./components/notfound";
import NavBar from "./components/navbar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
