// // cypress/integration/example_spec.js
// Cypress.on('uncaught:exception', (err) => {
//   // return false to prevent the error from failing this test
//   if (err.message.includes('Hydration')) {
//     return false;
//   }
// });

Cypress.on("uncaught:exception", (err) => {
  // Cypress and React Hydrating the document don't get along
  // for some unknown reason. Hopefully, we figure out why eventually
  // so we can remove this.
  // https://github.com/remix-run/remix/issues/4822#issuecomment-1679195650
  // https://github.com/cypress-io/cypress/issues/27204
  if (
      /hydrat/i.test(err.message) ||
      /Minified React error #418/.test(err.message) ||
      /Minified React error #423/.test(err.message)
  ) {
    return false
  }
});

describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('http://localhost:3000/');
    cy.get('img').should('be.visible');
    cy.get('.grid > .navds-stack > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > .navds-label').should('contain', 'Meny');
    cy.wait(1000);
    cy.get('.grid > .navds-stack > :nth-child(2)').should('be.visible');
    cy.get('.grid > .navds-stack > :nth-child(3)').should('be.visible');
    cy.get('.navds-stack > [href="/contact"] > .navds-link-panel__content > .navds-link-panel__title').should('contain', 'Contacts');


    cy.get('.navds-stack > [href="/contact"]').click();

  });
});

