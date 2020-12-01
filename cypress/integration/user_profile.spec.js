///  <reference types="Cypress" />

const apiUrl = Cypress.env('apiUrl')

describe('User can visit user profile', () => {
  beforeEach(() => {
    cy.login()
  })
  it('user can visit profile', () => {
    cy.intercept('GET', '**/profiles/**', {
      statusCode: 200,
      fixture: 'profile.json',
    })

    cy.intercept('GET', '**/articles?**', {
      statusCode: 200,
      fixture: 'article_list.json',
    })
    cy.get('[data-cy=profile]').click()
    cy.url().should('contain', '/profile/test@mail.com')
    cy.get('[data-cy=profile-to-settings]').click()
    cy.url().should('contain', '/settings')
    cy.get('[data-cy=profile]').click()
    cy.url().should('contain', '/profile/test@mail.com')
    cy.get('[data-cy=fav-articles]').click()
    cy.get('[data-cy=article-title]')
      .last()
      .should('contain.text', 'How to your dragon 2')
    cy.get('[data-cy=my-articles]').click({ force: true })
    cy.get('[data-cy=article-title]')
      .last()
      .should('contain.text', 'How to your dragon 2')
  })
  it('User can successfully update profile', () => {
    cy.login()
    cy.get('[data-cy=settings]').click()
    cy.url().should('contain', '/settings')
    ;[
      { field: 'email', text: 'test1@mail.com' },
      { field: 'password', text: 'password1' },
      { field: 'password', text: 'password1' },
      { field: 'username', text: 'username1' },
      { field: 'bio', text: 'bio1' },
      { field: 'image', text: 'http://localhost:3000' },
    ].forEach((element) => {
      cy.get(`[data-cy=${element.field}]`).type(element.text)
    })
    cy.get('[data-cy=updateProfile]').click()
    cy.url().should('not.contain', '/settings')
  })
})
