import React, { Component, Fragment } from "react";
import LoadingSign from "../ui/LoadingSign";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

class UserDetails extends Component {
  componentDidMount() {
    this.props.getUserDetail(this.props.match.params.login);
    this.props.getUserRepo(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    userDetails: PropTypes.object.isRequired,
    getUserDetail: PropTypes.func.isRequired,
    getUserRepo: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      company,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.userDetails;

    const { loading, repos } = this.props;

    return (
      <Fragment>
        {loading && <LoadingSign />}
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        Hireable: {""}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-light my-1">
              Visit {name}'s Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public repos: {public_repos}</div>
          <div className="badge badge-dark">Gists {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default UserDetails;
