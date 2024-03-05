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

describe('Components Page Tests', () => {
  before(() => {
    cy.viewport(1920, 1080);
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/component');
    cy.viewport(1920, 1080);
  });

  it('Check page layout', () => {
    cy.get('.appbar').should('be.visible');
    cy.get('footer').should('be.visible');

    cy.get('.navds-internalheader').should('be.visible');
    cy.get('.navds-stack > .navds-heading').should('contain', 'Komponenter');
    cy.get('.navds-table').should('exist');
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 2);
  });


  it('Check search', () => {
    cy.get('#searchField').should('exist');
    cy.get('#searchField').type('Death');
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 1);
    cy.get('.navds-table__body > .navds-table__row').should('contain', 'Death');
    // cy.wait(1000);
    cy.get('#searchField').clear();
    cy.get('.navds-table__body > .navds-table__row').should('have.length', 2);
  });


  it('Check add modal layout', () => {
    cy.get('button').contains('Legg til ny').should('be.visible');
    cy.get('button').contains('Legg til ny').click();
    cy.get('.navds-modal').should('be.visible');
    cy.get('.navds-modal__header').should('contain', 'Legg til ny komponent');
    cy.get('.navds-modal__body').should('exist');
    // cy.get('.navds-modal__footer').should('exist');
    cy.get('.navds-modal__header > .navds-button').should('exist');
    cy.get('.navds-modal__header > .navds-button').eq(0).click();
    cy.get('.navds-modal').should('not.be.visible');
  });

  it('Check add modal form', () => {

    cy.get('button').contains('Legg til ny').click();
    // cy.get('[data-testid="saveButton"]').should('be.disabled');

    cy.get('input[name="name"]').eq(0).type('+++');
    cy.get('body').click();
    cy.contains('Navnet kan bare inneholde a-z, og . (punktum). Det kan fra 3-128 tegn langt').should('be.visible');
    cy.get('input[name="name"]').eq(0).clear().type('abc');
    cy.get('input[name="basePath"]').eq(0).type('/abc');
    cy.get('body').click();
    cy.get('input[name="description"]').eq(0).type('Testing description field here');
    cy.get('body').click();
    cy.get('.navds-switch__input').eq(0).click();

    cy.get('button').contains('Save').click();
    cy.get('.navds-modal').should('not.be.visible');

    cy.wait(1000);
    cy.get('.navds-alert').should('be.visible');
    cy.get('.navds-alert__button').click();

  });

  it('Should goto the info page', () => {
    cy.get('.navds-table__body > :nth-child(1) > :nth-child(4)').click();
    cy.url().should('include', '/component/death_star_systems');
    cy.get('.navds-heading').should('exist');
    cy.get('.navds-tabs').should('exist');
    cy.get('.navds-tabs__tab').should('have.length', 4);
  });

  it('should have an edit form', () => {
    cy.get('.navds-table__body > :nth-child(1) > :nth-child(4)').click();
    cy.get('.navds-tabs__tab:nth-child(4)').click();
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="name"]').should('be.disabled');
    cy.get('input[name="basePath"]').should('exist');
    cy.get('input[name="description"]').should('exist');
    cy.get('.navds-switch__input').should('exist');
    cy.get('button').contains('Save').click();

    cy.wait(1000);
    cy.get('.navds-alert').should('be.visible');
    cy.get('.navds-alert__button').click();
  });

  it('should have a delete button', () => {
    cy.get('.navds-table__body > :nth-child(1) > :nth-child(4)').click();
    cy.get('.navds-tabs__tab:nth-child(4)').click();
    cy.get('button').contains('Delete').should('exist');
    cy.get('button').contains('Delete').click();
    cy.get('.navds-modal').should('be.visible');
    cy.get('.navds-modal__header').should('contain', 'Confirmation');
    cy.get('.navds-modal__body').should('exist');
    cy.get('.navds-modal__footer').should('exist');
    cy.get('.navds-modal__footer > .navds-button').should('exist');
    cy.wait(1000);
    // cy.get('.navds-modal__footer > .navds-button').eq(0).click();
    // cy.get('.navds-modal').should('not.be.visible');
    cy.get('button').contains('Ja').should('exist');
    cy.get('button').contains('Ja').click();

  });

});

