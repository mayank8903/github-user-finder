import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/ui/Alert";
import About from "./components/pages/About";
import UserDetails from "./components/users/UserDetails";

class App extends Component {
  state = {
    loading: false,
    users: [],
    userDetails: {},
    alert: null,
    repos: [],
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  getUserDetail = async (userDetail) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userDetail}?client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    this.setState({ userDetails: res.data, loading: false });
  };

  getUserRepo = async (userDetail) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userDetail}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET_ID}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, color) => {
    this.setState({
      alert: {
        message,
        color,
      },
    });
  };

  clearAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    const { users, loading, userDetails, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icons="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                      clearAlert={this.clearAlert}
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
                    getUserDetail={this.getUserDetail}
                    getUserRepo={this.getUserRepo}
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
    );
  }
}

export default App;
