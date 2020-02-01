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
beforeEach(()=>{
  cy.server()
  cy.route({
    method: "GET",
    status: 200,
    url: "https://conduit.productionready.io/api/user",
    response: "fixture:successful_login.json"
  });
  cy.route({
    method: "GET",
    url: "https://conduit.productionready.io/api/articles",
    status: 200,
    response: "fixture:article_list.json"
  });
  cy.route({
    method: "GET",
    url: "https://conduit.productionready.io/api/tags",
    status: 200,
    response: "fixture:tags.json"
  });
  cy.route({
    method: "GET",
    url: "https://conduit.productionready.io/api/articles/feed",
    status: 200,
    response: "fixture:own_article_list.json"
  });
})