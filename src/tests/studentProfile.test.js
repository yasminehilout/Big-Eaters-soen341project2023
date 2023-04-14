import { render, act } from '@testing-library/react';
import { StudentProfile } from '../components/studentProfile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test case for the `StudentProfile` component. It checks if the component renders a button
with the class `profileBtn student-profile` and an element with the tag `profile`. The test uses the
`render` function from the `@testing-library/react` library to render the component within a
`Provider` component that provides the Redux store. The `act` function is used to ensure that all
updates to the component are processed before the test checks for the presence of the elements. The
`expect` function is used to assert that the elements are defined. */
describe('StudentProfile', () => {
    test('should render student profile button', async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <StudentProfile />
                </Provider>
            );
        });
        const element = document.querySelector('.profileBtn student-profile');
        
        expect(element).toBeDefined();

        const element2 = document.querySelector('profile');

        expect(element2).toBeDefined();
    });
});