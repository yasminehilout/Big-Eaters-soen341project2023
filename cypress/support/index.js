// cypress/support/index.js
import './commands';
import firebase from '../../src/config/firebase';
import { googleProvider } from '../../src/config/firebase';

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.window().then((win) => {
    const provider = new auth().googleProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      console.log('Firebase user:', user);
    });
  });
});