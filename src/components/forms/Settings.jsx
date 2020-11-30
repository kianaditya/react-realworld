import React from 'react'
import { withRouter } from 'react-router-dom'

import useFormsHook from './formHooks'

const Settings = (props) => {
  const {
    formData,
    updateUser,
    logoutUser,
    onInputChangeHandler,
  } = useFormsHook(props)
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={updateUser}>
              <input
                className="form-control"
                type="text"
                placeholder="URL of profile picture"
                name="image"
                value={formData.image}
                onChange={onInputChangeHandler}
                data-cy="image"
              />
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                name="username"
                value={formData.username}
                onChange={onInputChangeHandler}
                data-cy="username"
              />
              <textarea
                className="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                name="bio"
                value={formData.bio}
                onChange={onInputChangeHandler}
                data-cy="bio"
              ></textarea>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={onInputChangeHandler}
                data-cy="email"
              />
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={onInputChangeHandler}
                data-cy="password"
              />
              <button
                data-cy="updateProfile"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </form>
            <hr></hr>
            <p>
              <button
                className="btn btn-lg btn-outline-danger pull-xs-left"
                data-cy="logout"
                onClick={() => logoutUser()}
              >
                Log out
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Settings)
