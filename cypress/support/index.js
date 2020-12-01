// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'

import loginResponse from '../fixtures/successful_login.json'

const successfulLogin = loginResponse

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(() => {
  cy.intercept('POST', '**/login', {
    fixture: 'successful_login.json',
  }).as('login')

  cy.intercept('GET', '**/articles', {
    statusCode: 200,
    fixture: 'article_list.json',
  }).as('getArticleList')

  cy.intercept('GET', '**/tags', {
    statusCode: 200,
    fixture: 'tags.json',
  }).as('getTags')

  cy.intercept('GET', '**/articles/feed', {
    statusCode: 200,
    fixture: 'own_article_list.json',
  }).as('getOwnFeed')

  cy.intercept('POST', '**/users', {
    fixture: 'successful_registration.json',
  }).as('successfulRegistration')

  cy.intercept('GET', '**/user', successfulLogin).as('successfulLogin')

  cy.intercept('PUT', '**/user', {
    statusCode: 200,
    fixture: 'successful_user_update.json',
  }).as('updateUser')
})
