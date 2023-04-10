import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Browsing } from '../components/browsing';
import { act } from 'react-dom/test-utils';

describe('Browsing component', () => {
    test('renders browsing div', () => {
        // useAuthState.mockReturnValueOnce([null]);
        act(() => {
        render(
            <Provider store={store}>
                <Browsing />
            </Provider>
        );
        });
        const element = document.querySelector('.browsing-div');

        // assert that the element exists and has the expected content
        expect(element).toBeDefined();
    });
});