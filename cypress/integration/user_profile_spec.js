///  <reference types="Cypress" />

const apiUrl = Cypress.env('apiUrl')

describe('User can visit user profile', () => {
  beforeEach(() => {
    cy.login()
  })
  it('user can visit profile', () => {
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
    cy.intercept('GET', `${apiUrl}profiles/test@mail.com`, {
      statusCode: 200,
      fixture: 'profile.json',
    })

    cy.intercept(
      { url: `${apiUrl}articles`, query: { author: 'test@mail.com' } },
      {
        statusCode: 200,
        fixture: 'article_list.json',
      }
    )
    cy.intercept(
      { url: `${apiUrl}articles`, query: { favorited: 'test@mail.com' } },
      {
        statusCode: 200,
        fixture: 'article_list.json',
      }
    )
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
    cy.get('[data-cy=my-articles]').click()
    cy.get('[data-cy=article-title]')
      .last()
      .should('contain.text', 'How to your dragon 2')
  })
})
