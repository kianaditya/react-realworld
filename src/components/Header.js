import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Header = () => {
  const [state, setState] = useContext(AppContext);
  return (
    <div data-cy="Header">
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link data-cy="home" className="nav-link active" to="/">
                Home
              </Link>
            </li>
            {state.currentUser.isSignedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" data-cy='create-article-link' to="/create">
                    <i className="ion-compose"></i>&nbsp;New Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link data-cy="settings" className="nav-link" to="/settings">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link data-cy="profile" className="nav-link" to={`/profile/${state.currentUser.username}`}>
                    &nbsp;{state.currentUser.username}
                  </Link>
                </li>
              </>
            )}
            {!state.currentUser.isSignedIn && (
              <>
                <li className="nav-item">
                  <Link
                    data-cy="signUpLink"
                    className="nav-link active"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    data-cy="loginLink"
                    className="nav-link active"
                    to="/login"
                  >
                    Log in
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
