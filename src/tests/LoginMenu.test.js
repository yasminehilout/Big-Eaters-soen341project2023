import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginMenu } from '../components/signin';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test case for the `LoginMenu` component. It checks if the component renders two buttons
for signing in as a student and an employer respectively. The test uses the `render` function from
`@testing-library/react` to render the component with a Redux store provider, and then uses
`screen.getByText` to find the two buttons by their text content. Finally, it uses `expect` to
assert that both buttons are in the document. */
describe('LoginMenu component', () => {
  it('renders student and employer sign-in buttons', () => {
    render(<Provider store={store}><LoginMenu /></Provider>);
    const studentButton = screen.getByText('Sign in as a Student');
    const employerButton = screen.getByText('Sign in as an Employer');
    expect(studentButton).toBeInTheDocument();
    expect(employerButton).toBeInTheDocument();
  });
});