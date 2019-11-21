/// <reference types="Cypress" />
describe("User can see Footer", () => {
  it("User can see all Footer elements", () => {
    cy.visit("/");
    cy.get("[data-cy=Footer]").should(
      "contain.text",
      "conduit An interactive learning project from Thinkster. Code & design licensed under MIT."
    );
  });
});
