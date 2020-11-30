import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import AuthFormContainer from './AuthFormContainer'
const axios = require('axios')

const RegistrationForm = (props) => {
  const [
    submitRegistration,
    onInputChangeHandler,
    formData,
  ] = useRegistrationForm(props)
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

const useRegistrationForm = (props) => {
  const [state, setState] = useContext(AppContext)
  const [formData, setFormData] = useState({})

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitRegistration = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const payload = { user: Object.fromEntries(formData) }

    try {
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://conduit.productionready.io/api/users'
          : 'http://localhost:3000/api/users',
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const currentUser = {
        isSignedIn: true,
        username: response.data.user.username,
      }
      setState((state) => ({ ...state, currentUser: currentUser }))
      props.history.push({
        pathname: '/',
      })
    } catch (error) {
      console.error(error)
    }
  }
  return [submitRegistration, onInputChangeHandler, formData]
}