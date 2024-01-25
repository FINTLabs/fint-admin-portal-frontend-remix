// cypress/integration/example_spec.js
Cypress.on('uncaught:exception', (err) => {
  // return false to prevent the error from failing this test
  if (err.message.includes('Hydration')) {
    return false;
  }
});

describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('http://localhost:3000/');
    cy.get('img').should('be.visible');
    cy.get('.grid > .navds-stack > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > .navds-label').should('contain', 'Meny');
    cy.get('.grid > .navds-stack > :nth-child(2)').should('be.visible');
    cy.get('.grid > .navds-stack > :nth-child(3)').should('be.visible');
    cy.get('.navds-stack > [href="/contact"] > .navds-link-panel__content > .navds-link-panel__title').should('contain', 'Contacts');

    cy.get('.navds-stack > [href="/contact"]').click();
    cy.get('.navds-stack > [href="/organization"]').click()
  });
});

