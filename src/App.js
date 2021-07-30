import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/ui/Alert";
import About from "./components/pages/About";
import UserDetails from "./components/users/UserDetails";
import GithubState from "./context/git/GithubState";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [alerts, setAlerts] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUserDetail = async (userDetail) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userDetail}?client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    setUserDetails(res.data);
    setLoading(false);
  };

  const getUserRepo = async (userDetail) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userDetail}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlert = (message, color) => {
    setAlerts({ message, color });
  };

  const clearAlert = () => {
    setAlerts(null);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icons="fab fa-github" />
          <div className="container">
            <Alert alert={alerts} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={setAlert}
                      clearAlert={clearAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route path="/about" component={About} />
              <Route
                path="/user/:login"
                render={(props) => (
                  <UserDetails
                    {...props}
                    getUserDetail={getUserDetail}
                    getUserRepo={getUserRepo}
                    userDetails={userDetails}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
