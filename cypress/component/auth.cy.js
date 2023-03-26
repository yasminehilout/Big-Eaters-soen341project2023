import { mount } from '@cypress/react';
import { Auth } from '../../src/components/auth';

describe('Auth component', () => {
  it('renders the component', () => {
    mount(<Auth />);
  });
  it('signs in with Google', () => {
    mount(<Auth />);
    cy.get('.b-signIn').contains('Sign In With Google').click();
    cy.get('.b-signIn').contains('Logout');
  });
});

