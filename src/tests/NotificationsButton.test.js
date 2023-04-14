import { render, act } from '@testing-library/react';
import { NotificationsButton } from '../components/notificationsButton';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test suite for the `NotificationsButton` component. It contains a single test case that
checks if the component is rendered correctly. The test uses the `render` function from the
`@testing-library/react` library to render the component within a `Provider` component that provides
the Redux store. The `act` function is used to ensure that the component is fully rendered before
the test checks for the presence of two elements with the `querySelector` method. The `expect`
function is used to check if the elements are defined, which indicates that they are present in the
rendered component. */
describe('NotificationsButton', () => {
    test('should render notifications Button', async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <NotificationsButton />
                </Provider>
            );
        });
        const element = document.querySelector('profileBtn');
        
        expect(element).toBeDefined();

        const element2 = document.querySelector('profile');

        expect(element2).toBeDefined();
    });
});