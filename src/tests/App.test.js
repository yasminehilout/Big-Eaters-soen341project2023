import React from 'react';

import { render, screen } from '@testing-library/react';
import App from './App';

describe('Testing the main menu App component', () => {
  test('renders Navbar and Browsing components', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // checks if Navbar component is rendered
    expect(screen.getByRole('main')).toBeInTheDocument(); // checks if Browsing component is rendered
  });
});
