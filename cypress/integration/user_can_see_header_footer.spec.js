/// <reference types="Cypress" />
describe('User can see Header and Footer', () => {
  it('User can see all Header and Footer elements', () => {
    cy.visit('/')
    cy.get('[data-cy=Header]')
      .should('contain.text', 'conduit')
      .and('contain.text', 'Home')
      .and('contain.text', 'Sign up')
    cy.get('[data-cy=Footer]').should(
      'contain.text',
      'conduit An interactive learning project from Thinkster. Code & design licensed under MIT.'
    )
  })
})
