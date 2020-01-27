/// <reference types="Cypress" />

describe('User can update profile', () => {
  it('User can successfully update profile',()=>{
    cy.route({
      method: "POST",
      status: 200,
      url: "https://conduit.productionready.io/api/users/login",
      response: "fixture:successful_login.json"
    });
    cy.route({
      method: "PUT",
      status: 200,
      url: "https://conduit.productionready.io/api/user",
      response: "fixture:successful_user_update.json"
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
    cy.get("[data-cy=settings]").click();
    cy.url().should("contain", "/settings");
    [
      { field: "email", text: "test1@mail.com" },
      { field: "password", text: "password1" },
      { field: "password", text: "password1" },
      { field: "username", text: "username1" },
      { field: "bio", text: "bio1" },
      { field: "image", text: "http://localhost:3000" }
    ].forEach(element => {
      cy.get(`[data-cy=${element.field}]`).type(element.text);
    });
    cy.get("[data-cy=updateProfile]").click();
    cy.url().should("not.contain","/settings")
  })
})
