import React from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

const RegistrationForm = props => {
  const submitRegistration = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = { user: Object.fromEntries(formData) };

    try {
      const response = await axios.post(
        "https://conduit.productionready.io/api/users",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      debugger
      props.history.push({
        pathname: '/',
        state: {
          signedIn: true
        }
      })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            {/* <ul className="error-messages">
              <li>That email is already taken</li>
            </ul> */}
            <form id="myForm" onSubmit={submitRegistration}>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                data-cy="userName"
                name="username"
              />

              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                data-cy="email"
                name="email"
              />
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                data-cy="password"
                name="password"
              />
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                data-cy="registerButton"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegistrationForm);
