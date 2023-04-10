import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Navbar } from '../components/navbar';
// import { auth } from '../config/firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { getRole } from '../features/counter/profileSlice';
// import { useSelector } from 'react-redux';

// jest.mock('../config/firebase');
// jest.mock('react-firebase-hooks/auth');
// jest.mock('../features/counter/profileSlice');
// jest.mock('react-redux');

describe('Navbar component', () => {
    test('renders LoginMenu when user is not authenticated', () => {
        // useAuthState.mockReturnValueOnce([null]);
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        expect(screen.getByText('Sign in as a Student')).toBeInTheDocument();
        expect(screen.getByText('Sign in as an Employer')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    // test('renders LogoutMenu and StudentProfile when user is authenticated and role is student', () => {
    //     const role = 'student';
    //     useSelector.mockReturnValueOnce(role);
    //     useAuthState.mockReturnValueOnce([{ uid: '123', email: 'test@test.com' }]);
    //     const { container } = render(
    //         <Provider store={store}>
    //             <Navbar />
    //         </Provider>
    //     );
    //     expect(screen.getByText('Logout')).toBeInTheDocument();
    //     expect(screen.queryByText('Sign in as a Student')).not.toBeInTheDocument();
    //     expect(container.querySelector('.student-profile')).toBeInTheDocument();
    // });

    // test('renders LogoutMenu and EmployerProfile when user is authenticated and role is employer', () => {
    //     const role = 'employer';
    //     useSelector.mockReturnValueOnce(role);
    //     useAuthState.mockReturnValueOnce([{ uid: '123', email: 'test@test.com' }]);
    //     const { container } = render(
    //         <Provider store={store}>
    //             <Navbar />
    //         </Provider>
    //     );
    //     expect(screen.getByText('Logout')).toBeInTheDocument();
    //     expect(screen.queryByText('Sign in as an Employer')).not.toBeInTheDocument();
    //     expect(container.querySelector('.employer-profile')).toBeInTheDocument();
    // });
});
