import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <Router>
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/registerForm" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    </Router>
  );
};

export default App;
