import React from 'react';
import { Auth } from '../../src/components/auth';
import { mount } from 'cypress/react18';

describe('Auth component', () => {
  /* This test case is checking if the `Auth` component is rendered properly by mounting it using
  `mount` from `cypress/react18` and then checking if the component exists in the DOM by using
  `cy.get` and passing the `data-testid` attribute of the component as a selector. If the component
  exists, the test case will pass. */
  it('renders the component', () => {
    mount(<Auth />);
    cy.get('[data-testid="auth-component"]').should('exist');
  });

  /* This test case is checking if the "Sign In With Google" button in the `Auth` component is working
  properly. It does this by mounting the `Auth` component using `mount` from `cypress/react18`,
  finding the "Sign In With Google" button using `cy.get` and passing the `data-testid` attribute of
  the button as a selector, clicking the button using `.click()`, and then checking if the button
  text has changed to "Logout" using `cy.get` and `.contains()`. If the button text has changed, the
  test case will pass. */
  it('signs in with Google', () => {
    mount(<Auth />);
    cy.get('[data-testid="auth-component"] .b-signIn')
      .contains('Sign In With Google')
      .click();
    cy.get('[data-testid="auth-component"] .b-signIn').contains('Logout');
  });
});