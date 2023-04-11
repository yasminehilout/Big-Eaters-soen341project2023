import React from 'react';
import { render, screen } from '@testing-library/react';
import { LogoutMenu } from '../components/signout';
import { Provider } from 'react-redux';
import { store } from '../app/store';

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