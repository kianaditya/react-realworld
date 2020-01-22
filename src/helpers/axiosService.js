import { getToken } from "./localStorage";

const axios = require("axios");

const defaultConfig = {
  baseURL: process.env.REACT_APP_API_URL
};

const http = axios.create(defaultConfig);

const secureHttp = axios.create(defaultConfig);

secureHttp.interceptors.request.use(
  config => {
    config.headers.common["Authorization"] = `Token ${getToken()}`;
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
    return http.post("users/login", data);
  },
  register(data) {
    return http.post("users", data);
  },
  getUser() {
    return secureHttp.get("user");
  },
  updateUser() {
    return secureHttp.put("user");
  },
  getProfile(username) {
    return http.get(`profiles/${username}`);
  },
  followUser(username) {
    return secureHttp.post(`profiles/${username}/follow`);
  },
  unfollowUser(username) {
    return secureHttp.delete(`profiles/${username}/follow`);
  },
  getArticles() {
    return http.get("articles");
  },
  getFeedArticles() {
    return secureHttp.get("articles/feed");
  },
  getSpecificArticle(slug) {
    return http.get(`articles/${slug}`);
  },
  createArticle(data) {
    return secureHttp.post("articles", data);
  },
  updateArticle(slug, data) {
    return secureHttp.put(`articles/${slug}`, data);
  },
  deleteArticle(slug) {
    return secureHttp.delete(`articles/${slug}`);
  },
  favoriteArticle(slug) {
    return secureHttp.post(`articles/${slug}/favorite`);
  },
  unfavoriteArticle(slug) {
    return secureHttp.delete(`articles/${slug}/favorite`);
  },
  fetchTags() {
    return secureHttp.get("tags");
  },
  addComments(slug, data) {
    return secureHttp.post(`articles/${slug}/comments`, data);
  },
  getComments(slug) {
    return http.get(`articles/${slug}/comments`);
  },
  deleteComments(slug, id) {
    return secureHttp.delete(`articles/${slug}/comments/${id}`);
  }
};
