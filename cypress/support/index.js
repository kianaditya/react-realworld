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

const apiUrl = Cypress.env('apiUrl')

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(() => {
  cy.server()

  // cy.intercept('GET', `${apiUrl}user`, {
  //   statusCode: 200,
  //   fixture: 'successful_login.json',
  // })
  // cy.intercept('GET', `${apiUrl}articles/test-article`, {
  //   fixture: 'test_article.json',
  // })
  // cy.intercept('GET', `${apiUrl}articles`, {
  //   statusCode: 200,
  //   fixture: 'article_list.json',
  // })
  // cy.intercept('GET', `${apiUrl}tags`, {
  //   statusCode: 200,
  //   fixture: 'tags.json',
  // })
  // cy.intercept('GET', `${apiUrl}articles/feed`, {
  //   statusCode: 200,
  //   fixture: 'own_article_list.json',
  // })
})
