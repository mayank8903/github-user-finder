import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ icons, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icons} />
        {title}
      </h1>
    </nav>
  );
};
Navbar.defaultProps = {
  title: "Github Finder",
  icons: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
