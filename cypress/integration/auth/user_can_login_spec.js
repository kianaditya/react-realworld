/// <reference types="Cypress" />
describe("User can login", () => {
  it("User can successfully login and logout", () => {
    cy.route({
      method: "POST",
      url: "https://conduit.productionready.io/api/users/login",
      response: "fixture:successful_login.json"
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
    cy.url().should("not.contain", "/login");
    cy.get("[data-cy=loginLink]").should("not.exist");
    cy.get("[data-cy=settings]").click();
    cy.get("[data-cy=logout]").click();
    cy.get("[data-cy=loginLink]").should("exist");
  });
});
