import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  links = [
    { lable: "Movies", to: "/movies" },
    { lable: "Rentals", to: "/rentals" },
    { lable: "Customers", to: "/customers" }
  ];
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/movies">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {this.links.map(link => (
              <li className="nav-item active">
                <Link className="nav-link" to={link.to}>
                  {link.lable}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
