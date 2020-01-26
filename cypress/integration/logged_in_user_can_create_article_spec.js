/// <reference types="Cypress" />
describe("User can create article", () => {
  it("User can create article", () => {
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/users/login",
      response: "fixture:successful_login.json"
    });
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/articles",
      response: "fixture:successful_article_return.json"
    });
    cy.visit("/");
    cy.get("[data-cy=create-article-link]").should("not.exist");
    cy.get("[data-cy=loginLink]").click();
    cy.url().should("contain", "/login");
    [
      { field: "email", text: "test@mail.com" },
      { field: "password", text: "password" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=create-article-link]").click();
    cy.url().should("contain", "/create");
    [
      { field: "article-title", text: "How to train your dragon" },
      { field: "article-slug", text: "how-to-train-your-dragon" },
      { field: "article-description", text: "Ever wonder how?" },
      { field: "article-tags", text: "dragons,training" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=submit-article]").click();
    cy.url().should("contain", "/article/how-to-train-your-dragon");
  });
});
