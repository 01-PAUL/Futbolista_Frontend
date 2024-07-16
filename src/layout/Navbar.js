import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpg";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#4D1DDB" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>
            <img src={logo} alt="Logo" width="30" height="30" className="me-2" />
            Full Stack Futbolista
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn btn-outline-light" to="/addfutbolistas">
            Agregar Futbolista
          </Link>
        </div>
      </nav>
    </div>
  );
}
