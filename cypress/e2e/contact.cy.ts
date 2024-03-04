// // cypress/integration/example_spec.js
// Cypress.on('uncaught:exception', (err) => {
//   // return false to prevent the error from failing this test
//   if (err.message.includes('Hydration')) {
//     return false;
//   }
// });

import button from "@navikt/ds-react/src/button/Button";
import {wait} from "@testing-library/user-event/dist/types/utils";

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

describe('Contact Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/contact');
    });

    it('Check contact page layout', () => {
        cy.get('.appbar').should('be.visible');
        cy.get('footer').should('be.visible');

        cy.get('.navds-internalheader').should('be.visible');
        cy.get('.navds-table').should('exist');
        cy.get('.navds-table__body > .navds-table__row').should('have.length', 5);
    });

    it('Check table data', () => {
        cy.get('.navds-table__row').eq(0).should('contain', 'Name');
        cy.get('.navds-table__row').eq(0).should('contain', 'Technical');
    });

    it('Check search', () => {
        cy.get('#searchfield-r1r').should('exist');
        cy.get('#searchfield-r1r').type('Luke');
        cy.get('.navds-table__body > .navds-table__row').should('have.length', 1);
        cy.get('.navds-table__body > .navds-table__row').should('contain', 'Luke');
        // cy.wait(1000);
        cy.get('#searchfield-r1r').clear();
        cy.get('.navds-table__body > .navds-table__row').should('have.length', 5);
    });

    it('check row expand', () => {
        cy.get('.navds-table__toggle-expand-button').eq(0).click();
        cy.get('.navds-table__expanded-row-content').eq(0).should('be.visible');
        cy.get('.navds-table__toggle-expand-button').eq(0).click();
        cy.get('navds-table__expanded-row-content').should('not.exist');
    });


    it('Check add modal layout', () => {
        cy.get('button').contains('Add New').should('be.visible');
        cy.get('button').contains('Add New').click();
        cy.get('.navds-modal').should('be.visible');
        cy.get('.navds-modal__header').should('contain', 'Add New Contact');
        cy.get('.navds-modal__body').should('exist');
        // cy.get('.navds-modal__footer').should('exist');
        cy.get('.navds-modal__header > .navds-button').should('exist');
        cy.get('.navds-modal__header > .navds-button').eq(0).click();
        cy.get('.navds-modal').should('not.be.visible');
    });

    it('Check add modal form', () => {

        cy.get('button').contains('Add New').click();
        // cy.get('[data-testid="saveButton"]').should('be.disabled');

        cy.get('input[name="nin"]').eq(0).type('123');
        cy.get('body').click();
        cy.contains('Ugyldig Fødselsnummer').should('be.visible');

        cy.get('input[name="firstName"]').eq(0).type('123');
        cy.get('body').click();
        cy.contains('Navnet kan bare inneholde a-z og mellomrom').should('be.visible');


        cy.get('input[name="lastName"]').eq(0).type('123');
        cy.get('body').click();
        cy.contains('Navnet kan bare inneholde a-z og mellomrom').should('be.visible');

        cy.get('input[name="mail"]').eq(0).type('123');
        cy.get('body').click();
        cy.contains('Ugyldig e-postadresse').should('be.visible');

        cy.get('input[name="nin"]').eq(0).clear().type('12345678901');
        cy.get('input[name="firstName"]').eq(0).clear().type('Luke');
        cy.get('input[name="lastName"]').eq(0).clear().type('Skywalker');
        cy.get('input[name="mail"]').eq(0).clear().type('luke@skywalker.no');
        cy.get('input[name="mobile"]').eq(0).clear().type('12345678');

        cy.get('button').contains('Save').click();
        cy.get('.navds-modal').should('not.be.visible');

        cy.wait(1000);
        cy.get('.navds-alert').should('be.visible');
        cy.get('.navds-alert__button').click();

    });

    it('Check edit modal layout', () => {
        // cy.get('.navds-table__body > .navds-table__row > .navds-table__column').eq(3).click();
        cy.get('button').contains('Edit').click();
        cy.get('.navds-modal').should('be.visible');
        cy.get('.navds-modal__header').should('contain', 'Edit Contact');
        cy.get('.navds-modal__body').should('exist');
        cy.get('.navds-modal__header > .navds-button').should('exist');
        cy.get('.navds-modal__header > .navds-button').eq(0).click();
        cy.get('.navds-modal').should('not.be.visible');
    });
});

