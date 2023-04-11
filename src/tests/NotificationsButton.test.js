import { render, act } from '@testing-library/react';
import { NotificationsButton } from '../components/notificationsButton';
import { Provider } from 'react-redux';
import { store } from '../app/store';

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