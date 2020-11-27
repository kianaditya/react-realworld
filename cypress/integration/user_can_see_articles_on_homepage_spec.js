/// <reference types="Cypress" />
const apiUrl = Cypress.env('apiUrl')
describe('User can see articles on Homepage', () => {
  it('User can see all articles', () => {
    cy.intercept('GET', `${apiUrl}articles`, {
      statusCode: 200,
      fixture: 'article_list.json',
    })
    cy.intercept('GET', `${apiUrl}tags`, {
      statusCode: 200,
      fixture: 'tags.json',
    })
    cy.visit('/')
    cy.get('[data-cy=allArticles]').should(
      'contain.text',
      'How to train your dragon'
    )
  })
})
