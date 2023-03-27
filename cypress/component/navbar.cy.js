import Chance from 'chance';
import { Navbar } from '../../src/components/navbar';

const chance = new Chance();

describe('Navbar component', () => {
  const testUser = { uid: chance.guid() };
  
  beforeEach(() => {
    cy.intercept('GET', '**/useAuthState*', { fixture: 'useAuthState' });
  });

  it('renders the LoginMenu component if user is not logged in', () => {
    cy.intercept('GET', '**/useAuthState*', { fixture: 'useAuthState-unauth' });
    cy.mount(<Navbar />);
    cy.get('[data-testid="login-menu"]').should('be.visible');
    cy.get('[data-testid="logout-menu"]').should('not.exist');
    cy.get('[data-testid="profile-menu"]').should('not.exist');
    cy.get('[data-testid="student-profile"]').should('not.exist');
  });

  it('renders the StudentProfile, LogoutMenu, and ProfileMenu components if user is logged in', () => {
    cy.intercept('GET', '**/useAuthState*', { fixture: 'useAuthState-auth', user: testUser });
    cy.mount(<Navbar />);
    cy.get('[data-testid="student-profile"]').should('be.visible');
    cy.get('[data-testid="logout-menu"]').should('be.visible');
    cy.get('[data-testid="profile-menu"]').should('be.visible');
    cy.get('[data-testid="login-menu"]').should('not.exist');
  });
});