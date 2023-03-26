Cypress.Commands.add("googleAuth", () => {
    // your Google authentication code here
    cy.visit("https://accounts.google.com/signin");

    cy.get('input[type="email"]').type("your-email-address");
    cy.get("#identifierNext").click();
  
    cy.get('input[type="password"]').type("your-password");
    cy.get("#passwordNext").click();
});