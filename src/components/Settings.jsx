import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import axios from "../helpers/axiosService";
import { AppContext } from "../AppContext";
import { deleteToken } from "../helpers/localStorage";

const Settings = props => {
  const [formData, setFormData] = useState({});
  const [state, setState] = useContext(AppContext);

  const onInputChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updateUser = async e => {
    e.preventDefault();
    const payload = { user: formData };
    try {
      const response = await axios.updateUser(payload);
      const currentUser = {
        isSignedIn: true,
        username: response.data.user.username
      };
      setState(state => ({ ...state, currentUser: currentUser }));
      props.history.push({
        pathname: "/"
      });
    } catch (error) {
      console.error(error);
    }
  };
  const logoutUser = () => {
    deleteToken();
    setState(state => ({...state, currentUser: {isSignedIn: false}}))
    props.history.push({
      pathname: "/"
    });
  };
  return (
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
            <form onSubmit={updateUser}>
              <input
                class="form-control"
                type="text"
                placeholder="URL of profile picture"
              />
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </form>
            <p>
              <button class="btn btn-lg btn-primary pull-xs-left" data-cy="logout" onClick={() => logoutUser()}>
                Log out
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Settings);
