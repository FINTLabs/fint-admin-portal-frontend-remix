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

describe('Dashboard Tests', () => {
  it('App bar setup', () => {
    cy.visit('http://localhost:3000/');
    cy.get('img').should('be.visible');
    cy.get('button').contains('Meny').should('be.visible');
    cy.get('button').contains('Logg ut').should('be.visible');
    //cy.get('button').contains('Mocked User').should('be.visible');
    // cy.wait(1000);
    cy.get('.grid > .navds-stack > :nth-child(3)').should('be.visible');

  });

  it('Boxes at top', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.navds-stack > [href="/contact"] > .navds-link-panel__content > .navds-link-panel__title').should('contain', 'Contacts');
    cy.get('.navds-stack > [href="/contact"]').click();

    cy.visit('http://localhost:3000/');
    cy.get('.navds-stack > [href="/organization"] > .navds-link-panel__content > .navds-link-panel__title').should('contain', 'Organizations');
    cy.get('.navds-stack > [href="/organization"]').click();

    cy.visit('http://localhost:3000/');
    cy.get('.navds-stack > [href="/component"] > .navds-link-panel__content > .navds-link-panel__title').should('contain', 'Components');
    cy.get('.navds-stack > [href="/component"]').click();


  });

  it('navigates to the dashboard on link click', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Meny').click();

    // Click the link to navigate to the dashboard
    cy.get('a').contains('To the dashboard').click();
    // Assert the URL to ensure navigation happened to the dashboard
    cy.url().should('include', '/');
  });

  it('checks navigation for each LinkPanel', () => {
    cy.visit('http://localhost:3000/');

    // Open the menu
    cy.get('button').contains('Meny').click();

    // Define an array of paths and their corresponding text to click and verify
    const links = [
      { text: 'Contacts', path: '/contact' },
      { text: 'Organizations', path: '/organization' },
      { text: 'Components', path: '/component' },
      { text: 'Packages', path: '/access' },
      { text: 'Tools', path: '/tools' },
      { text: 'Molly', path: '/molly' },
    ];

    links.forEach(link => {
      cy.get('a').contains(link.text).click();
      cy.url().should('include', link.path);
      cy.visit('http://localhost:3000/');
      cy.get('button').contains('Meny').click();
    });

    cy.get('button').contains('Meny').click();

  });
  it('checks for the footer', () => {
    cy.visit('http://localhost:3000/');
    cy.get('footer').should('be.visible');
    cy.get('footer').contains('Til Toppen');
  });

});

