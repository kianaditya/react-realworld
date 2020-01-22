import { getToken } from "./localStorage";

const axios = require("axios");

const defaultConfig = {
  baseURL: process.env.REACT_APP_API_URL
};

const http = axios.create(defaultConfig);

const secureHttp = axios.create(defaultConfig);

secureHttp.interceptors.request.use(
  config => {
    // config.headers = getToken();
    return config;
  },

  error => {
    return errorResponse(error);
  }
);
http.interceptors.response.use(
  config => {
    return config;
  },

  error => {
    return errorResponse(error);
  }
);

const errorResponse = error => {
  if (error.response) {
    switch (error.response.status) {
      case 500:
        throw new Error(
          "Sorry, something went wrong with our server. We are working hard to fix the issue. Please re-visit in some time."
        );
      case 404:
        throw new Error("Something went wrong. Please try again.");
      default:
        return Promise.reject(error);
    }
  }
  if (error.message === "Network Error") {
    throw new Error(
      "We are facing network issues.Please try again after some time."
    );
  }
  return Promise.reject(error);
};

export default {
  login(data) {
    return http.post(
      "users/login",
      data
    );
  },
  fetchArticles() {
    return secureHttp.get("articles");
  },
  fetchTags() {
    return secureHttp.get("tags");
  }
};
