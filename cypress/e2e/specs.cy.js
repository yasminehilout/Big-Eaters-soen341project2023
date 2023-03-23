/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('JobBrowsing', () => {
    const email = chance.email();
    const password = chance.string({ length: 8 });

    //redirect user back to homepage after each test
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
    })

    it('has a title', () => {
        cy.contains('include', 'Job Browsing');
    });

    it('blocks protected routes', () => {

        cy.get('.j-button apply').click();
        cy.get.contains('Firestore').click();

        cy.get('notification-message').children()
            .should('contain', 'You must be logged in to apply for a job')
            .and('be.visible');
    });

    it('signs up a new user', () => {

        //Click Login
        cy.get('.b-signIn').click();
        cy.contains('Sign In').click();

        // Assert that the user is redirected to the login page
        cy.url().should('include', 'login');

        // Fill out the form
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);

        //Assert welcome message
        cy.contains('Welcome new user!');
        cy.contains('Logout').click();

    });



});
