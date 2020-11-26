/// <reference types="Cypress" />
describe('User can see articles on Homepage', () => {
  it('User can see all articles', () => {
    cy.visit('/')
    cy.get('[data-cy=allArticles]').should(
      'contain.text',
      'How to train your dragon'
    )
  })
})
