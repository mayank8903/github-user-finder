import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({
  showClear,
  clearUsers,
  setAlert,
  searchUsers,
  clearAlert,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a name", "danger");
    } else {
      searchUsers(text);
      clearAlert();
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search users..."
          value={text}
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
