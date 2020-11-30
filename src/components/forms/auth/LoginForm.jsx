import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthFormContainer from './AuthFormContainer'
import { useLoginForm } from './authHooks'

const LoginForm = (props) => {
  const [submitLogin, formData, onInputChangeHandler] = useLoginForm(props)

  return (
    <AuthFormContainer>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <a href="">Have an account?</a>
      </p>

      {/* <ul className="error-messages">
              <li>That email is already taken</li>
            </ul> */}
      <form id="loginForm" onSubmit={submitLogin}>
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
          data-cy="login-button"
        >
          Sign in
        </button>
      </form>
    </AuthFormContainer>
  )
}

export default withRouter(LoginForm)
