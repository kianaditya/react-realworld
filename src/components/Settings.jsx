import React from "react";

const Settings = () => {
  return (
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
            <form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
