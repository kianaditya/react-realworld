/// <reference types="Cypress" />
describe("User can specific article", () => {
  it("User can see specific article", () => {
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
    cy.visit("/");
    cy.get("[data-cy=allArticles]").should(
      "contain.text",
      "How to train your dragon"
    );
    cy.get("[data-cy=article-title]").first().click()
    cy.url().should("contain","/how-to-train-your-dragon")
  });
});