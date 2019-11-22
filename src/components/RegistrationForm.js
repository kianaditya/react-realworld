import React from "react";

const RegistrationForm = () => {
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
            <form>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Your Name" data-cy='userName'/>
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Email" data-cy='email' />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="password" placeholder="Password" data-cy='password' />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right" data-cy='registerButton' >
            Sign up
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
