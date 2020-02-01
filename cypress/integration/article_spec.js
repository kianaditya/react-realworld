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
    writeComment(comment) {}
  };

  it("create a new article", () => {
    cy.url().should("not.contain", "/create");
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");
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

  it.only("write a comment", () => {
    cy.url().should("not.contain", "/create");
    cy.get("[data-cy=create-article-link]").click();
    courseManagement.writeArticle(article);
    cy.url().should("contain", "/article/test-article");

    cy.get("[data-cy=comment-text]").type("great post 👍");
    cy.get("[data-cy=post-comment]").click();

    cy.contains("[data-cy=comment]", "great post 👍").should("be.visible");
  });
});
