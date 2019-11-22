/// <reference types="Cypress" />
describe("User can sign up", () => {
  it("User can successfully sign up", () => {
    cy.visit("/");
    cy.get("[data-cy=signUpLink]").click();
    cy.url().should("contain", "/signup");
    [
      { field: "userName", text: "TestAccount" },
      { field: "email", text: "test@mail.com" },
      { field: "password", text: "password" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=registerButton]").click();
    cy.url().should("eq", "http://localhost:3001");
  });
});
