import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

const App = () => {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
