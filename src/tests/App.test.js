import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Testing the main menu App component', () => {
  test('renders Navbar and Browsing components', () => {
    act(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // checks if Navbar component is rendered
    expect(screen.getByRole('main')).toBeInTheDocument(); // checks if Browsing component is rendered
  });
});