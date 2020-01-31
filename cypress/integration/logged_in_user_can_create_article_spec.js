/// <reference types="Cypress" />
describe("User can create article", () => {
  it("User can create article", () => {
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/articles",
      response: "fixture:successful_article_return.json"
    });
    cy.visit("/");
    cy.get("[data-cy=create-article-link]").should("not.exist");

    cy.loggedInAs("test@mail.com");
    cy.get("[data-cy=create-article-link]").click();
    cy.url().should("contain", "/create");
    [
      { field: "article-title", text: "How to train your dragon" },
      { field: "article-description", text: "how-to-train-your-dragon" },
      { field: "article-body", text: "Ever wonder how?" },
      { field: "article-tags", text: "dragons,training" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=submit-article]").click();
    cy.url().should("contain", "/article/how-to-train-your-dragon");
  });
});
