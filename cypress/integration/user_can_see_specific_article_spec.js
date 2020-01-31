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
    cy.get("[data-cy=article-title]")
      .first()
      .click();
    cy.url().should("contain", "/how-to-train-your-dragon");
  });
  it("Logged in User can favorite article", () => {
    cy.route({
      method: "POST",
      url:
        "https://conduit.productionready.io/api/articles/how-to-train-your-dragon/favorite",
      response: "fixture:successful_favorite.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles/feed",
      status: 200,
      response: "fixture:own_article_list.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list.json"
    });
    cy.visit("/");
    // cy.loggedInAs("test@mail.com");
    cy.login();
    cy.contains("Nothing here yet!");
    cy.get("[data-cy=globalFeed]").click();
    cy.get("[data-cy=my-articles]").should(
      "contain.text",
      "How to train your dragon"
    );
    cy.get("[data-cy=article-title]")
      .first()
      .click();
    cy.url().should("contain", "/how-to-train-your-dragon");
    cy.get("[data-cy=fav-button]")
      .should("contain.text", "Favorite Post (0)")
      .click();
    cy.get("[data-cy=fav-button]").should("contain.text", "Post favorited (3)");
  });
});
