// // cypress/integration/example_spec.js
// Cypress.on('uncaught:exception', (err) => {
//   // return false to prevent the error from failing this test
//   if (err.message.includes('Hydration')) {
//     return false;
//   }
// });

import button from "@navikt/ds-react/src/button/Button";

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

describe('Organization Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/organization');
  });

  it('Check page layout', () => {
    cy.get('.appbar').should('be.visible');
    cy.get('footer').should('be.visible');

    cy.get('.navds-internalheader').should('be.visible');
    cy.get('.navds-table').should('exist');
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 5);
  });

  // it('Check table data', () => {
  //   cy.get('.navds-table__row').eq(0).should('contain', 'Navn');
  //   cy.get('.navds-table__row').eq(0).should('contain', 'Technical');
  // } );

  it('Check search', () => {
    cy.get('#searchfield-r1n').should('exist');
    cy.get('#searchfield-r1n').type('Jedi');
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 1);
    cy.get('.navds-table__body > .navds-table__row').should('contain', 'Jedi');
    cy.wait(1000);
    cy.get('#searchfield-r1n').clear();
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 5);
  });


  it('Check add button', () => {
    cy.get('button').contains('Add New').should('be.visible');
    cy.get('button').contains('Add New').click();
    cy.get('.navds-modal').should('be.visible');
    cy.get('.navds-modal__header').should('contain', 'Add New Organization');
    cy.get('.navds-modal__button').should('exist');
    cy.get('.navds-modal__header > .navds-modal__button').should('exist');

    cy.get('.navds-modal__body').should('exist');
    // cy.get('.navds-modal__footer').should('exist');
  //
  //   // cy.get('.navds-modal__footer > .navds-button').should('exist');
  //   // cy.get('.navds-modal__footer > .navds-button').contains('Cancel').should('be.visible');
  //   // cy.get('.navds-modal__footer > .navds-button').contains('Save').should('be.visible');
  //   // cy.get('.navds-modal__close > .navds-button').contains('Cancel').click();
  //   // cy.get('.navds-modal__footer > .navds-button').contains('Cancel').click();
  //   // cy.get('.navds-modal').should('not.exist');
  });



});

