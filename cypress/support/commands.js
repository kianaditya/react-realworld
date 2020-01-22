// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add("loggedInAs", uid => {
//   cy.route({
//     method: "POST",
//     status: 200,
//     url: "https://conduit.productionready.io/api/users/login",
//     response: "fixture:successful_login.json"
//   });
//   window.localStorage.setItem(
//     "jwt",
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzYxNjEsInVzZXJuYW1lIjoidGVhY2hlckBtYWlsLmNvbSIsImV4cCI6MTU3OTk1Njc2OH0.q1NeXVrFr2b196zwdQW6h-nUN5I0-xo0tkgmkK3DbFM"
//   );
//   cy.visit("/");
// });
