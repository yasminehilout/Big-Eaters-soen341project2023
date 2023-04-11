import { render, act } from '@testing-library/react';
import { StudentProfile } from '../components/student-profile';
import { Provider } from 'react-redux';
import { store } from '../app/store';

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