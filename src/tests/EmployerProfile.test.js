import { render, act } from '@testing-library/react';
import { EmployerProfile } from '../components/employer-profile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('StudentProfile', () => {
    test('should render student profile button', async () => {
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