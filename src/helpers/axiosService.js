import { getToken } from './localStorage'

const axios = require('axios')

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://conduit.productionready.io/api/'
    : 'http://localhost:3000/api/'

const defaultConfig = {
  baseURL: baseURL,
}

const http = axios.create(defaultConfig)

const secureHttp = axios.create(defaultConfig)

secureHttp.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Token ${getToken()}`
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  /* istanbul ignore next */
  (error) => {
    return errorResponse(error)
  }
)
http.interceptors.response.use(
  (config) => {
    return config
  },
  /* istanbul ignore next */
  (error) => {
    return errorResponse(error)
  }
)

const errorResponse = (error) => {
  /* istanbul ignore next */
  if (error.response) {
    switch (error.response.status) {
      case 500:
        throw new Error(
          'Sorry, something went wrong with our server. We are working hard to fix the issue. Please re-visit in some time.'
        )
      case 404:
        throw new Error('Something went wrong. Please try again.')
      default:
        return Promise.reject(error)
    }
  }
  /* istanbul ignore next */
  if (error.message === 'Network Error') {
    throw new Error(
      'We are facing network issues.Please try again after some time.'
    )
  }
  /* istanbul ignore next */
  return Promise.reject(error)
}
/* istanbul ignore next */
export default {
  login(data) {
    return http.post('users/login', data)
  },
  register(data) {
    return http.post('users', data)
  },
  getUser() {
    return secureHttp.get('user')
  },
  updateUser(data) {
    return secureHttp.put('user', data)
  },
  getProfile(username) {
    return http.get(`profiles/${username}`)
  },
  followUser(username) {
    return secureHttp.post(`profiles/${username}/follow`)
  },
  unfollowUser(username) {
    return secureHttp.delete(`profiles/${username}/follow`)
  },
  getArticles() {
    return http.get('articles')
  },
  getUserArticles(username) {
    return http.get(`articles?author=${username}`)
  },
  getUserFavoriteArticles(username) {
    return http.get(`articles?favorited=${username}`)
  },
  getFeedArticles() {
    return secureHttp.get('articles/feed')
  },
  getSpecificArticle(slug) {
    return http.get(`articles/${slug}`)
  },
  createArticle(data) {
    return secureHttp.post('articles', data)
  },
  updateArticle(slug, data) {
    return secureHttp.put(`articles/${slug}`, data)
  },
  deleteArticle(slug) {
    return secureHttp.delete(`articles/${slug}`)
  },
  favoriteArticle(slug) {
    return secureHttp.post(`articles/${slug}/favorite`)
  },
  unfavoriteArticle(slug) {
    return secureHttp.delete(`articles/${slug}/favorite`)
  },
  fetchTags() {
    return http.get('tags')
  },
  addComment(slug, data) {
    return secureHttp.post(`articles/${slug}/comments`, data)
  },
  getComments(slug) {
    return http.get(`articles/${slug}/comments`)
  },
  deleteComments(slug, id) {
    return secureHttp.delete(`articles/${slug}/comments/${id}`)
  },
}
