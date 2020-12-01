/// <reference types="Cypress" />

describe('User can see articles', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('User can see all articles', () => {
    cy.get('[data-cy=allArticles]').should(
      'contain.text',
      'How to train your dragon'
    )
  })
  it('logged in User can see own articles', () => {
    cy.login()
    cy.get('[data-cy=my-articles]').should(
      'contain.text',
      'How to train your dragon'
    )
  })
})
