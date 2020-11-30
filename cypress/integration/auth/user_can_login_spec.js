/// <reference types="Cypress" />
const apiUrl = Cypress.env('apiUrl')

describe('User can login', () => {
  it('User can successfully login and logout', () => {
    cy.intercept('POST', `${apiUrl}users/login`, {
      fixture: 'successful_login.json',
    })
    cy.intercept('GET', `${apiUrl}user`, {
    statusCode: 200,
    fixture: 'successful_login.json',
  })
  cy.intercept('GET', `${apiUrl}articles`, {
    statusCode: 200,
    fixture: 'article_list.json',
  })
  cy.intercept('GET', `${apiUrl}tags`, {
    statusCode: 200,
    fixture: 'tags.json',
  })
  cy.intercept('GET', `${apiUrl}articles/feed`, {
    statusCode: 200,
    fixture: 'own_article_list.json',
  })
    cy.visit('/')
    cy.get('[data-cy=loginLink]').click()
    cy.url().should('contain', '/login')
    ;[
      { field: 'email', text: 'test@mail.com' },
      { field: 'password', text: 'password' },
    ].forEach((element) => {
      cy.get(`[data-cy=${element.field}]`).type(element.text)
    })
    cy.get('[data-cy=login-button]').click({ force: true })
    cy.url().should('not.contain', '/login')
    cy.get('[data-cy=loginLink]').should('not.exist')
    cy.get('[data-cy=settings]').click()
    cy.get('[data-cy=logout]').click()
    cy.get('[data-cy=loginLink]').should('exist')
  })
})
