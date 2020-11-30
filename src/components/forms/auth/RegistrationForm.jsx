import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthFormContainer from './AuthFormContainer'
import useFormHook from '../formHooks'

const RegistrationForm = (props) => {
  const {
    submitRegistration,
    onInputChangeHandler,
    formData,
 } = useFormHook(props)
  return (
    <AuthFormContainer>
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
          value={formData.username}
          onChange={onInputChangeHandler}
        />

        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Email"
          data-cy="email"
          name="email"
          value={formData.email}
          onChange={onInputChangeHandler}
        />
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          data-cy="password"
          name="password"
          value={formData.password}
          onChange={onInputChangeHandler}
        />
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          data-cy="registerButton"
        >
          Sign up
        </button>
      </form>
    </AuthFormContainer>
  )
}

export default withRouter(RegistrationForm)
