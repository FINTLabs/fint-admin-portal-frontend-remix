// cypress/integration/example_spec.js
Cypress.on('uncaught:exception', (err) => {
  // return false to prevent the error from failing this test
  if (err.message.includes('Hydration')) {
    return false;
  }
});

describe('My First Test', () => {
  it('Visits the app', () => {
    cy.intercept('GET', 'http://localhost:8081/api/me', { fixture: 'me.json' }).as('getMe');
    cy.visit('http://localhost:3000');
    // cy.contains('Novari Logo Here');
  });
});

