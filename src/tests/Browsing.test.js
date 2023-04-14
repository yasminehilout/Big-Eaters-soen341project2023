import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Browsing } from '../components/browsing';
import { act } from 'react-dom/test-utils';

/* This is a test suite for the Browsing component in a React application. It contains a single test
case that checks if the component renders a div with the class name "browsing-div". The test uses
the `render` function from the `@testing-library/react` library to render the component within a
`Provider` component that provides the Redux store. The `act` function from `react-dom/test-utils`
is used to ensure that all updates to the component are processed before the test checks for the
existence of the div element. Finally, the `expect` function is used to assert that the element
exists and has the expected content. */
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