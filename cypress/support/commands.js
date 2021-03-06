// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const apiUrl = Cypress.env('apiUrl')



Cypress.Commands.add('loggedInAs', (user = Cypress.env('user')) => {
  cy.visit('/')
  cy.get('[data-cy=create-article-link]').should('not.exist')
  cy.get('[data-cy=loginLink]').click()
  cy.url().should('contain', '/login')
  ;[
    { field: 'email', text: 'test@mail.com' },
    { field: 'password', text: 'password' },
  ].forEach((element) => {
    cy.get(`[data-cy=${element.field}]`).type(element.text)
  })
  cy.get('[data-cy=login-button]').click()
})

Cypress.Commands.add('login', () => {
  window.localStorage.setItem(
    'token',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODEyNjgsInVzZXJuYW1lIjoiSm9obiBEb2UxMjMxMiIsImV4cCI6MTU4NTY2NTMxNH0.trFBjnvXoUAM5W82qVd-71_PMra3byUV60jLNkEIhj8'
  )
  cy.visit('/')
})

Cypress.Commands.add('login2', () => {
  window.localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1NiIsImV4cCI6IjE1ODU2NjUzMTQiLCJ1c2VybmFtZSI6InRlc3QyQG1haWwuY29tIn0.B6SOxk8Vj6kZxzXYenGDZ2JXYlAHfC5VaU0WVnE0788'
  )
  // cy.visit('/')
})
