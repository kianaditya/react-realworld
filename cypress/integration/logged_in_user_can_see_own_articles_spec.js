/// <reference types="Cypress" />
describe("Logged in User can see own articles on Homepage", () => {
  it("logged in User can see own articles", () => {
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list.json"
    });
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/users/login",
      response: "fixture:successful_login.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/tags",
      status: 200,
      response: "fixture:tags.json"
    });
    cy.route({
      method: "GET",
      url:
        "https://conduit.productionready.io/api/articles/feed",
      status: 200,
      response: "fixture:own_article_list.json"
    });
    cy.visit("/");
    cy.get("[data-cy=loginLink]").click();
    cy.url().should("contain", "/login");
    [
      { field: "email", text: "test@mail.com" },
      { field: "password", text: "password" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=my-articles]").should(
      "contain.text",
      "How to train your dragon"
    );
  });
});
