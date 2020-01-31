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
      method: "GET",
      url: "https://conduit.productionready.io/api/tags",
      status: 200,
      response: "fixture:tags.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles/feed",
      status: 200,
      response: "fixture:own_article_list.json"
    });
    cy.visit("/");
    cy.loggedInAs("test@mail.com");
    cy.get("[data-cy=my-articles]").should(
      "contain.text",
      "How to train your dragon"
    );
  });
});
