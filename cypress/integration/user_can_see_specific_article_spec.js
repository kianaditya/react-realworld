/// <reference types="Cypress" />

describe('User can specific article', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })
  it('User can see specific article', () => {
    cy.intercept('GET', '**/articles/how-to-train-your-dragon', {
      statusCode: 200,
      fixture: 'single_article.json',
    }).as('getSpecificArticle')

    cy.get('[data-cy=allArticles]').should(
      'contain.text',
      'How to train your dragon'
    )
    cy.get('[data-cy=article-title]').first().click()
    cy.url().should('contain', '/how-to-train-your-dragon')
  })
  // it.only('Logged in User can favorite article', () => {
  //   cy.intercept('POST', '**/articles/how-to-train-your-dragon/favorite', {
  //     statusCode: 200,
  //     fixture: 'successful_favorite.json',
  //   }).as('addFavoriteArticle')

  //   cy.intercept('GET', '**/articles/how-to-train-your-dragon', {
  //     statusCode: 200,
  //     fixture: 'successful_favorite.json',
  //   }).as('getSpecificArticle')

  //   cy.login()
  //   cy.visit('/')
  //   cy.contains('Nothing here yet!')
  //   cy.get('[data-cy=my-articles]').should(
  //     'contain.text',
  //     'How to train your dragon'
  //   )
  //   cy.get('[data-cy=globalFeed]').click()
  //   cy.get('[data-cy=article-title]').first().click()
  //   cy.url().should('contain', '/how-to-train-your-dragon')
  //   cy.get('[data-cy=fav-button]')
  //     .should('contain.text', 'Favorite Post (0)')
  //     .click()
  //   cy.get('[data-cy=fav-button]').should('contain.text', 'Post favorited (3)')
  // })
})
