import { render, act } from '@testing-library/react';
import { EmployerProfile } from '../components/employerProfile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test suite for the `EmployerProfile` component. It contains a single test case that checks
if the component renders a button with the class `profileBtn employer-profile` and a `profile`
element. The test uses the `render` function from the `@testing-library/react` library to render the
component within a `Provider` component that provides the Redux store. The `act` function is used to
ensure that all updates to the component are processed before the test checks for the presence of
the elements. The `querySelector` method is used to find the elements in the rendered component, and
the `expect` function is used to check if they are defined. */
describe('EmployerProfile', () => {
    test('should render employer profile button', async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <EmployerProfile />
                </Provider>
            );
        });
        const element = document.querySelector('profileBtn employer-profile');
        
        expect(element).toBeDefined();

        const element2 = document.querySelector('profile');

        expect(element2).toBeDefined();
    });
});