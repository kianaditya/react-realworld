/// <reference types="Cypress" />
describe("User can sign up", () => {
  it("User can successfully sign up", () => {
    cy.visit("/");
    cy.get("Sign up").click();
    cy.url()
      .should("contain", "/signup")
      [
        ({ field: "userName", text: "TestAccount" },
        { field: "email", text: "test@mail.com" },
        { field: "password", text: "password" })
      ].forEach(element => {
        cy.get(`name=${element.field}`).type(element.text);
      });
    cy.get("[data-cy=registerButton]").click();
    cy.url().should("eq", "http://localhost:3001");
  });
});
