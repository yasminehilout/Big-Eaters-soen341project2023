import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Navbar } from '../components/navbar';
import { act } from 'react-dom/test-utils';


/* This is a test case for the Navbar component. It checks if the LoginMenu is rendered when the user
is not authenticated. It uses the `render` function from `@testing-library/react` to render the
Navbar component wrapped in a Provider with a store. It then uses `screen` to check if the expected
text is present in the rendered component. The `act` function from `react-dom/test-utils` is used to
ensure that all updates to the component are processed before the assertions are made. */
describe('Navbar component', () => {
    test('renders LoginMenu when user is not authenticated', () => {
        // useAuthState.mockReturnValueOnce([null]);
        act(() => {
            render(
                <Provider store={store}>
                    <Navbar />
                </Provider>
            );
          });
        expect(screen.getByText('Sign in as a Student')).toBeInTheDocument();
        expect(screen.getByText('Sign in as an Employer')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
});
