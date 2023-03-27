import React from 'react';
import { Auth } from '../../src/components/auth';
import { mount } from 'cypress/react18';

describe('Auth component', () => {
  it('renders the component', () => {
    mount(<Auth />);
    cy.get('[data-testid="auth-component"]').should('exist');
  });

  it('signs in with Google', () => {
    mount(<Auth />);
    cy.get('[data-testid="auth-component"] .b-signIn')
      .contains('Sign In With Google')
      .click();
    cy.get('[data-testid="auth-component"] .b-signIn').contains('Logout');
  });
});