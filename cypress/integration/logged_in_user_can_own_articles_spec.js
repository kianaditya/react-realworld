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
      url:
        "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0",
      status: 200,
      response: "fixture:own_article_list.json"
    });
    cy.loggedInAs("user121212@mail.com");
    cy.get("[data-cy=myArticles]").should(
      "contain.value",
      "Global Feed"
    );
  });
});
