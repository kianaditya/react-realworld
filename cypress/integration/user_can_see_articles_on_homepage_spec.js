/// <reference types="Cypress" />
describe("User can see articles on Homepage", () => {
  it("User can see all articles", () => {
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list.json"
    });
    cy.visit("/");
    cy.get("[data-cy=allArticles]").should(
      "contain.text",
      "this a demo article"
    );
  });
});
