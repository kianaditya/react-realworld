/// <reference types="Cypress" />
const apiUrl = Cypress.env('apiUrl')
describe("User can sign up", () => {
  it("User can successfully sign up", () => {
    // cy.route({
    //   method: "POST",
    //   url: "https://conduit.productionready.io/api/users",
    //   response: "fixture:successful_registration.json"
    // });
    cy.intercept('GET', `${apiUrl}articles`, {
      statusCode: 200,
      fixture: 'article_list.json',
    })
    cy.intercept('GET', `${apiUrl}tags`, {
      statusCode: 200,
      fixture: 'tags.json',
    })
    cy.intercept('POST', `${apiUrl}users`, {
      fixture: 'successful_registration.json',
    })
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
    cy.url().should("not.contain", "/signup");
    cy.get("[data-cy=loginLink]").should("not.exist")

  });
});
