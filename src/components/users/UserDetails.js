import React, { useEffect, Fragment } from "react";
import LoadingSign from "../ui/LoadingSign";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

const UserDetails = ({
  userDetails,
  loading,
  repos,
  getUserDetail,
  getUserRepo,
  match,
}) => {
  useEffect(() => {
    getUserDetail(match.params.login);
    getUserRepo(match.params.login);
    //eslint-disable-next-line
  }, []);

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
  } = userDetails;

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
};

UserDetails.propTypes = {
  loading: PropTypes.bool,
  userDetails: PropTypes.object.isRequired,
  getUserDetail: PropTypes.func.isRequired,
  getUserRepo: PropTypes.func.isRequired,
};
export default UserDetails;
