import React from 'react';
import { render, screen } from '@testing-library/react';
import { LogoutMenu } from '../components/signout';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test case for the `LogoutMenu` component. It checks if the component renders a logout
button. The `describe` function is used to group related test cases together, and the `it` function
is used to define a specific test case. The `render` function is used to render the `LogoutMenu`
component with the Redux store provided by the `Provider` component. The `screen.getByText` function
is used to find the logout button by its text content, and the `expect` function is used to assert
that the button is in the document. */
describe('LogoutMenu component', () => {
    it('renders student and employer sign-in buttons', () => {
        render(
            <Provider store={store}>
                <LogoutMenu />
            </Provider>);
        const logoutButton = screen.getByText('Logout');
        expect(logoutButton).toBeInTheDocument();
    });
});