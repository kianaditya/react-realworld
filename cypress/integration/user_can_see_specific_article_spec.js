/// <reference types="Cypress" />
const apiUrl = Cypress.env('apiUrl')
describe('User can specific article', () => {
  it('User can see specific article', () => {
    cy.intercept('GET', `${apiUrl}tags`, {
      statusCode: 200,
      fixture: 'tags.json',
    })
    cy.intercept('GET', `${apiUrl}articles/how-to-train-your-dragon`, {
      statusCode: 200,
      fixture: 'single_article.json',
    })
    cy.intercept('GET', `${apiUrl}articles`, {
      statusCode: 200,
      fixture: 'article_list.json',
    })
    cy.visit('/')
    cy.get('[data-cy=allArticles]').should(
      'contain.text',
      'How to train your dragon'
    )
    cy.get('[data-cy=article-title]').first().click()
    cy.url().should('contain', '/how-to-train-your-dragon')
  })
   // it.only('Logged in User can favorite article', () => {
  //   cy.intercept(
  //     'POST',
  //     `${apiUrl}articles/how-to-train-your-dragon/favorite`,
  //     {
  //       statusCode: 200,
  //       fixture: 'successful_favorite.json',
  //     }
  //   )
  //   cy.intercept('GET', `${apiUrl}articles/how-to-train-your-dragon`, {
  //     statusCode: 200,
  //     fixture: 'successful_favorite.json',
  //   })
  //   cy.intercept('GET', `${apiUrl}articles/feed`, {
  //     statusCode: 200,
  //     fixture: 'own_article_list.json',
  //   })
  //   cy.intercept('GET', `${apiUrl}tags`, {
  //     statusCode: 200,
  //     fixture: 'tags.json',
  //   })
  //   cy.intercept('GET', `${apiUrl}articles`, {
  //     statusCode: 200,
  //     fixture: 'article_list.json',
  //   })

  //   cy.visit('/')
  //   cy.login()
  //   cy.contains('Nothing here yet!')
  //   cy.get('[data-cy=my-articles]').should(
  //     'contain.text',
  //     'How to train your dragon'
  //     )
  //     cy.get('[data-cy=globalFeed]').click()
  //   cy.get('[data-cy=article-title]').first().click()
  //   cy.url().should('contain', '/how-to-train-your-dragon')
  //   cy.get('[data-cy=fav-button]')
  //     .should('contain.text', 'Favorite Post (0)')
  //     .click().pause()
  //   cy.get('[data-cy=fav-button]').should('contain.text', 'Post favorited (3)')
  // })
})
