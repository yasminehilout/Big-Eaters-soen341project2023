import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import { act } from 'react-dom/test-utils';

/* This is a test suite for the main menu App component in a React application. It contains one test
case that checks if the Navbar and Browsing components are rendered correctly. The test uses the
`render` function from the `@testing-library/react` library to render the App component wrapped in a
Provider component that provides the Redux store. The `act` function from the `react-dom/test-utils`
library is used to ensure that all updates to the component are applied before the test checks if
the Navbar and Browsing components are present in the rendered output. The `expect` function is used
to assert that the components are present in the output by checking if they have specific roles
assigned to them. */
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