///  <reference types="Cypress" />
import testArticle from '../fixtures/test_article.json'
import updatedTestArticle from '../fixtures/updated_test_article.json'
import postComment from '../fixtures/comments.json'

const apiUrl = Cypress.env('apiUrl')

let getTestArticleResponse = testArticle
let commentResponse = postComment

const article = {
  title: 'test title',
  description: 'about test',
  body: 'This is a test post',
  tagList: ['test'],
}
const updatedArticle = {
  title: 'test title 2',
  description: 'about test 2',
  body: 'This is a test post 2',
  tagList: ['test2'],
}

describe('Article management', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiUrl}user`, {
      statusCode: 200,
      fixture: 'successful_login.json',
    })
    cy.intercept('GET', `${apiUrl}articles/test-article/comments`, (req) => {
      req.reply(commentResponse)
    }).as('getComment')
    cy.intercept('GET', `${apiUrl}articles/test-article`, (req) => {
      req.reply(getTestArticleResponse)
    }).as('getTestArticle')
    cy.intercept('GET', `${apiUrl}articles`, {
      statusCode: 200,
      fixture: 'article_list.json',
    })
    cy.intercept('GET', `${apiUrl}tags`, {
      statusCode: 200,
      fixture: 'tags.json',
    })
    cy.login()

    cy.intercept('POST', `${apiUrl}articles`, {
      fixture: 'test_article.json',
    })

    cy.intercept('PUT', `${apiUrl}articles/test-article`, {
      fixture: 'updated_test_article.json',
    })

    cy.intercept('POST', `${apiUrl}articles/test-article/comments`, (req) => {
      req.reply(commentResponse)
    }).as('postComment')

    cy.intercept('DELETE', `${apiUrl}articles/test-article`, {
      statusCode: 200,
    })
    cy.intercept('DELETE', `${apiUrl}articles/test-article/comments/53676`, {
      body: {
        comments: [],
      },
    })
  })

  const tagsToCypress = (tags) => tags.join('{enter}') + '{enter}'
  const courseManagement = {
    writeArticle(article) {
      cy.get('[data-cy=article-title-input]').clear().type(article.title)
      cy.get('[data-cy=article-description]').clear().type(article.description)
      cy.get('[data-cy=article-body]').clear().type(article.body)
      cy.get('[data-cy=article-tags]')
        .clear()
        .type(tagsToCypress(article.tagList))
      cy.get('[data-cy=submit-article]').click()
    },
    writeComment(comment) {
      cy.get('[data-cy=comment-text]').type(comment)
      cy.get('[data-cy=post-comment]').click()
    },
  }

  it('create a new article', () => {
    cy.url().should('not.contain', '/create')
    cy.get('[data-cy=create-article-link]').click()
    courseManagement.writeArticle(article)
    cy.url().should('contain', '/article/test-article')
  })
  it('delete article', () => {
    cy.url().should('not.contain', '/create')
    cy.get('[data-cy=create-article-link]').click()
    courseManagement.writeArticle(article)
    cy.url().should('contain', '/article/test-article')

    cy.intercept('GET', `${apiUrl}articles`, {
      statusCode: 200,
      fixture: 'article_list_after_delete.json',
    })
    cy.get('[data-cy=delete-article]').click()
    cy.get('[data-cy=globalFeed]').click()
    cy.get('[data-cy=my-articles]').should('not.contain.text', 'test article')
  })

  it('update article', () => {
    cy.intercept('GET', `${apiUrl}articles/test-article`, {
      fixture: 'updated_test_article.json',
    })
    cy.get('[data-cy=create-article-link]').click()
    courseManagement.writeArticle(article)
    cy.wait('@getTestArticle').then(() => {
      getTestArticleResponse = updatedTestArticle
    })
    cy.url().should('contain', '/article/test-article')
    cy.get('[data-cy=article-title]').should('contain', 'test title')

    cy.get('[data-cy=edit-article]').click()
    courseManagement.writeArticle(updatedArticle)
    cy.url().should('contain', '/article/test-article')
    cy.get('[data-cy=article-title]').should('contain', 'test title 2')
  })

  it('write and delete a comment', () => {
    cy.url().should('not.contain', '/create')
    cy.get('[data-cy=create-article-link]').click()
    courseManagement.writeArticle(article)
    cy.url().should('contain', '/article/test-article')

    courseManagement.writeComment('great post')
    cy.contains('[data-cy=comment]', 'great post').should('be.visible')

    cy.wait('@getComment').then(() => {
      commentResponse = {
        comments: [],
      }
    })
    cy.get('[data-cy=delete-comment]').click({ force: true })
    cy.get('[data-cy=comment-body]').should('not.exist')
  })
})
