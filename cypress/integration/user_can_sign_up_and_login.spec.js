/// <reference types="Cypress" />

const apiUrl = Cypress.env('apiUrl')

describe('User authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('User can successfully sign up', () => {
    cy.get('[data-cy=signUpLink]').click()
    cy.url().should('contain', '/signup')
    ;[
      { field: 'userName', text: 'TestAccount' },
      { field: 'email', text: 'test@mail.com' },
      { field: 'password', text: 'password' },
    ].forEach((element) => {
      cy.get(`[data-cy=${element.field}]`).type(element.text)
    })

    cy.get('[data-cy=registerButton]').click()
    cy.url().should('not.contain', '/signup')

    cy.get('[data-cy=loginLink]').should('not.exist')
  })

  it('User can successfully login and logout', () => {
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
