import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginMenu } from '../components/signin';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('LoginMenu component', () => {
  it('renders student and employer sign-in buttons', () => {
    render(<Provider store={store}><LoginMenu /></Provider>);
    const studentButton = screen.getByText('Sign in as a Student');
    const employerButton = screen.getByText('Sign in as an Employer');
    expect(studentButton).toBeInTheDocument();
    expect(employerButton).toBeInTheDocument();
  });
});