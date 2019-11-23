/// <reference types="Cypress" />
describe("User can login", () => {
  it("User can successfully login", () => {
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
    cy.get("[data-cy=loginButton]").click();
    // cy.url().should("not.contain", "/login");
  });
});