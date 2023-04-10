import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginMenu } from "../components/signin";
import { signInWithPopup } from 'firebase/auth';
import { getDoc, setDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import { setRole } from '../features/counter/profileSlice';

jest.mock('firebase/auth', () => ({
    signInWithPopup: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    doc: jest.fn(),
}));

jest.mock('../config/firebase', () => ({
    auth: {
        currentUser: {
            uid: 'someUid',
            email: 'test@test.com',
        },
    },
    db: {},
    googleProvider: {},
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('LoginMenu component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call signInWithGoogleStudent function when the student sign in button is clicked', async () => {
        render(
            <Provider store={store}>
                <LoginMenu />
            </Provider>
        );

        const studentButton = screen.getByText('Sign in as a Student');
        fireEvent.click(studentButton);

        expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
        expect(doc).toHaveBeenCalledWith(db, 'users', 'someUid');
        expect(getDoc).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalledWith(doc(), { role: 'student' });
        expect(setDoc).not.toHaveBeenCalled();
        expect(store.getActions()).toEqual([{ type: 'profile/setRole', payload: { role: 'student' } }]);
    });

    it('should call signInWithGoogleEmployer function when the employer sign in button is clicked', async () => {
        render(
            <Provider store={store}>
                <LoginMenu />
            </Provider>
        );

        const employerButton = screen.getByText('Sign in as an Employer');
        fireEvent.click(employerButton);

        expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
        expect(doc).toHaveBeenCalledWith(db, 'users', 'someUid');
        expect(getDoc).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalledWith(doc(), { role: 'employer' });
        expect(setDoc).not.toHaveBeenCalled();
        expect(store.getActions()).toEqual([{ type: 'profile/setRole', payload: { role: 'employer' } }]);
    });
});