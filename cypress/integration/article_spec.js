///  <reference types="Cypress" />

describe("Article management", () => {
  beforeEach(() => {
    cy.login();
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/articles",
      response: "fixture:test_article.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles/test-article",
      response: "fixture:test_article.json"
    });
    cy.route({
      method: "PUT",
      url: "https://conduit.productionready.io/api/articles/test-article",
      response: "fixture:updated_test_article.json"
    });
    cy.route({
      method: "POST",
      url:
        "https://conduit.productionready.io/api/articles/test-article/comments",
      response: "fixture:comments.json"
    });
    cy.route({
      method: "GET",
      url:
        "https://conduit.productionready.io/api/articles/test-article/comments",
      response: "fixture:comments.json"
    });
    cy.route({
      method: "DELETE",
      url:
        "https://conduit.productionready.io/api/articles/test-article/comments/53676",
      response: {
        comments: []
      }
    });
  });
  const article = {
    title: "test title",
    description: "about test",
    body: "This is a test post",
    tagList: ["test"]
  };
  const updatedArticle = {
    title: "test title 2",
    description: "about test 2",
    body: "This is a test post 2",
    tagList: ["test2"]
  };
  const tagsToCypress = tags => tags.join("{enter}") + "{enter}";
  const courseManagement = {
    writeArticle(article) {
      cy.get("[data-cy=article-title]")
        .clear()
        .type(article.title);
      cy.get("[data-cy=article-description]")
        .clear()
        .type(article.description);
      cy.get("[data-cy=article-body]")
        .clear()
        .type(article.body);
      cy.get("[data-cy=article-tags]")
        .clear()
        .type(tagsToCypress(article.tagList));
      cy.get("[data-cy=submit-article]").click();
    },
    writeComment(comment) {
      cy.get("[data-cy=comment-text]").type(comment);
      cy.get("[data-cy=post-comment]").click();
    }
  };

  it("create a new article", () => {
    cy.url().should("not.contain", "/create");
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");
  });
  it("delete article", () => {
    cy.url().should("not.contain", "/create");
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");
    cy.route({
      method: "DELETE",
      url: "https://conduit.productionready.io/api/articles/test-article",
      status: 200,
      response: {}
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list_after_delete.json"
    });
    cy.get("[data-cy=delete-article]").click();
    cy.get("[data-cy=globalFeed]").click();
    cy.get("[data-cy=my-articles]").should("not.contain.text", "test article");
  });

  it("update article", () => {
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");
    cy.get("[data-cy=article-title]").should("contain", "test title");
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles/test-article",
      response: "fixture:updated_test_article.json"
    });
    cy.get("[data-cy=edit-article]").click();
    courseManagement.writeArticle(updatedArticle);
    cy.url().should("contain", "/article/test-article");
    cy.get("[data-cy=article-title]").should("contain", "test title 2");
  });

  it("write and delete a comment", () => {
    cy.url().should("not.contain", "/create");
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");

    courseManagement.writeComment("great post");
    cy.contains("[data-cy=comment]", "great post").should("be.visible");
    cy.route({
      method: "GET",
      url:
        "https://conduit.productionready.io/api/articles/test-article/comments",
      response: {
        comments: []
      }
    });
    cy.get("[data-cy=delete-comment]").click({ force: true });
    cy.get("[data-cy=comment-body]").should("not.contain", "great post");
  });
});
