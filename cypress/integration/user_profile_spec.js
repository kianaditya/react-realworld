///  <reference types="Cypress" />

describe("User can visit user profile", () => {
  beforeEach(() => {
    cy.login();
  });
  it("user can visit profile", () => {
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/profiles/test@mail.com",
      status: 200,
      response: "fixture:profile.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles?author=test@mail.com",
      status: 200,
      response: "fixture:article_list.json"
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles?favorited=test@mail.com",
      status: 200,
      response: "fixture:own_article_list.json"
    });
    cy.get("[data-cy=profile]").click();
    cy.url().should("contain","/profile/test@mail.com")
    cy.get("[data-cy=profile-to-settings]").click()
    cy.url().should("contain", "/settings");
    cy.get("[data-cy=profile]").click();
    cy.url().should("contain","/profile/test@mail.com")
    cy.get("[data-cy=fav-articles]").click();
    cy.get("[data-cy=article-title]").last().should("contain.text","How to train your dragon 2")
    cy.get("[data-cy=my-articles]").click();
    cy.get("[data-cy=article-title]").last().should("contain.text","How to your dragon 2")
  });
});
