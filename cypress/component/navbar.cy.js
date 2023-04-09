import firebase from '../../firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import React from 'react';
import { Navbar } from '../../src/components/navbar';
import { mount } from 'cypress/react18';

describe('Navbar component', () => {
  it('renders a login menu when the user is not authenticated', () => {
    mount(<Navbar />);
    cy.contains('Sign In').should('exist');
    cy.contains('Sign In With Google').should('exist');
    cy.contains('Student Profile').should('not.exist');
    cy.contains(' Logout ').should('not.exist');
    cy.contains('Profile').should('not.exist');
  });


  it('displays student profile, logout and profile menu when user is authenticated', () => {
    // Stub useAuthState to return a user object
    cy.stub(window, 'useAuthState').returns([user]);
    
    // Mount the Navbar component
    mount(<Navbar />);

    // Check that student profile, logout, and profile menu are displayed
    cy.contains('Student Profile').should('exist');
    cy.contains('Logout').should('exist');
    cy.contains('Profile').should('exist');

    // Check that login menu is not displayed
    cy.contains('LoginMenu').should('not.exist');
  });
});