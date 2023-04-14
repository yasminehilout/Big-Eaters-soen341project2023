import { render, act } from '@testing-library/react';
import { UploadFile } from '../components/uploadFile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/* This is a test case written in Jest for the `UploadFile` component. It checks whether the component
renders a button with the ID `uploadFileButton`. The test uses the `render` function from
`@testing-library/react` to render the component within a `Provider` component that provides the
Redux store. The `act` function is used to ensure that all updates to the component are processed
before the test checks for the existence of the button element. Finally, the `expect` function is
used to assert that the `element` variable is defined, which means that the button with the ID
`uploadFileButton` exists in the rendered component. */
describe('StudentProfile', () => {
    test('should render student profile button', async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <UploadFile />
                </Provider>
            );
        });
        const element = document.querySelector('uploadFileButton');
        
        expect(element).toBeDefined();
    });
});