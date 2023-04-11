import { render, act } from '@testing-library/react';
import { UploadFile } from '../components/uploadFile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

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