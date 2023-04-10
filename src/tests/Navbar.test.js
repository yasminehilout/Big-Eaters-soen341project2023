import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Navbar } from '../components/navbar';

jest.mock('../config/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    currentUser: null
  }
}));

describe('Navbar component', () => {
  test('renders LoginMenu when user is not authenticated', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
    expect(screen.getByText('Sign in as a Student')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders LogoutMenu and StudentProfile when user is authenticated and role is student', () => {
    jest.mock('../features/counter/profileSlice', () => ({
      getRole: jest.fn(() => 'student')
    }));

    const { container } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Sign in as a Student')).not.toBeInTheDocument();
    expect(container.querySelector('.student-profile')).toBeInTheDocument();
  });

  test('renders LogoutMenu and EmployerProfile when user is authenticated and role is employer', () => {
    jest.mock('../features/counter/profileSlice', () => ({
      getRole: jest.fn(() => 'employer')
    }));

    const { container } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Sign in as an Employer')).not.toBeInTheDocument();
    expect(container.querySelector('.employer-profile')).toBeInTheDocument();
  });
});