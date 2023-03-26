import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from '../../src/components/auth';

describe('Auth component', () => {
  it('renders the component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Auth />, div);
    cy.get('[data-testid="auth-component"]').should('exist');
  });

  it('signs in with Google', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Auth />, div);
    cy.get('[data-testid="auth-component"] .b-signIn')
      .contains('Sign In With Google')
      .click();
    cy.get('[data-testid="auth-component"] .b-signIn').contains('Logout');
  });
});