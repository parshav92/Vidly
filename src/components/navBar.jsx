import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ user }) => {
  const location = useLocation();

  const navStyle = {
    background: "#f8f9fa",
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const navLinksStyle = {
    display: "flex",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
    margin: "0 10px",
    fontWeight: "bold",
  };

  const linkStyleActive = {
    color: "#007bff",
    textDecoration: "underline",
    margin: "0 10px",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Vidly
      </Link>
      <div style={navLinksStyle}>
        <Link
          to="/movies"
          style={location.pathname === "/movies" ? linkStyleActive : linkStyle}
        >
          Movies
        </Link>
        <Link
          to="/customers"
          style={
            location.pathname === "/customers" ? linkStyleActive : linkStyle
          }
        >
          Customers
        </Link>
        <Link
          to="/rentals"
          style={location.pathname === "/rentals" ? linkStyleActive : linkStyle}
        >
          Rentals
        </Link>
        {user && user.name && (
          <>
            <Link
              to="/profile"
              style={
                location.pathname === "/profile" ? linkStyleActive : linkStyle
              }
            >
              {user.name}
            </Link>
            <Link to="/logout" style={linkStyle}>
              Logout
            </Link>
          </>
        )}
        {!user && (
          <>
            <Link
              to="/loginForm"
              style={
                location.pathname === "/loginForm" ? linkStyleActive : linkStyle
              }
            >
              Login
            </Link>
            <Link
              to="/registerForm"
              style={
                location.pathname === "/registerForm"
                  ? linkStyleActive
                  : linkStyle
              }
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
