/// <reference types="Cypress" />
describe("User can see header", () => {
  it("User can see all Header elements", () => {
    cy.visit("/");
    cy.get("[data-cy=Header]")
      .should("contain.text", "conduit")
      .and("contain.text", "Home")
      .and("contain.text", "Sign up");
  });
});
