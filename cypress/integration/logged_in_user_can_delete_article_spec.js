describe("User can delete article", () => {
  it("user can delete article", () => {
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list.json"
    });
    cy.route({
      method: "GET",
      url:
        "https://conduit.productionready.io/api/articles/how-to-train-your-dragon",
      status: 200,
      response: "fixture:single_article.json"
    });
    cy.route({
      method: "DELETE",
      url:
        "https://conduit.productionready.io/api/articles/how-to-train-your-dragon",
      status: 200,
      response: {}
    });
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/tags",
      status: 200,
      response: "fixture:tags.json"
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
    cy.get("[data-cy=globalFeed]").click();
    cy.get("[data-cy=my-articles]").should(
      "contain.text",
      "How to train your dragon"
    );
    cy.get("[data-cy=article-title]")
      .first()
      .click();
    cy.url().should("contain", "/how-to-train-your-dragon");
    cy.route({
      method: "GET",
      url: "https://conduit.productionready.io/api/articles",
      status: 200,
      response: "fixture:article_list_after_delete.json"
    });
    cy.get("[data-cy=delete-article]").click();
    cy.get("[data-cy=globalFeed]").click();
    cy.get("[data-cy=my-articles]").should(
      "not.contain.text",
      "How to train your dragon"
    );
  });
});
