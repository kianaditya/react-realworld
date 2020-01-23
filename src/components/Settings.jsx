import React, { useState,useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import axios from "../helpers/axiosService";
import { AppContext } from "../AppContext";
import { deleteToken } from "../helpers/localStorage";

const Settings = props => {
  const [state, setState] = useContext(AppContext);
  const [formData, setFormData] = useState({});
  useEffect(() => {
   setFormData(state.currentUser)
  }, [state])
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
                name="image"
                value={formData.image}
                  onChange={onInputChangeHandler}
              />
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                name="username"
                value={formData.username}
                  onChange={onInputChangeHandler}
              />
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                name="bio"
                value={formData.bio}
                  onChange={onInputChangeHandler}
              ></textarea>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                  onChange={onInputChangeHandler}
              />
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                  onChange={onInputChangeHandler}
              />
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </form>
            <hr></hr>
            <p>
              <button class="btn btn-lg btn-outline-danger pull-xs-left" data-cy="logout" onClick={() => logoutUser()}>
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
