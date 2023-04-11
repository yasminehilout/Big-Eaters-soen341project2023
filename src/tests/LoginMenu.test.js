// import {
//     assertFails,
//     assertSucceeds,
//     initializeTestEnvironment,
//     RulesTestEnvironment,
// } from "@firebase/rules-unit-testing";
// import { readFileSync } from 'fs';


// test('text with "Logout" exists in authenticated context', async () => {
//     let testEnv = await initializeTestEnvironment({
//         projectId: "big-eaters",
//         firestore: {
//             host: 'localhost',
//             port: 5000,
//         },
//     });

//     const alice = testEnv.authenticatedContext('alice', {});
//     // perform some action that would display the "Logout" text in the authenticated context
//     const isAuthenticated = true;

//     // assert that the "Logout" text exists in the authenticated context
//     await assertSucceeds(
//         new Promise((resolve, reject) => {
//             if (isAuthenticated) {
//                 resolve(expect(alice).toHaveTextContent('Logout'));
//             } else {
//                 reject(new Error('Not authenticated'));
//             }
//         })
//     );
// });
/* This is a test suite for the `LoginMenu` component. It imports necessary testing libraries such as
`render` and `fireEvent` from `@testing-library/react`, and `signInWithPopup` from `firebase/auth`.
It also imports the `LoginMenu` component itself, as well as the `Provider` and `store` from the
Redux store. */

// import { render, fireEvent } from '@testing-library/react';
// import { LoginMenu } from '../components/signin';
// import { signInWithPopup } from 'firebase/auth';
// import { Provider } from 'react-redux';
// import { store } from '../app/store';

// jest.mock('firebase/auth', () => ({
//     signInWithPopup: jest.fn(() => Promise.resolve()),
// }));

// describe('LoginMenu', () => {
//   it('calls signInWithPopup when the "Sign in as a Student" button is clicked', () => {
//     const { getByText } = render(        
//     <Provider store={store}>
//         <LoginMenu />
//       </Provider>);
//     const signInAsStudentButton = getByText('Sign in as a Student');
//     fireEvent.click(signInAsStudentButton);
//     expect(signInWithPopup).toHaveBeenCalled();
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginMenu } from '../components/signin';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('LoginMenu component', () => {
  it('renders student and employer sign-in buttons', () => {
    render(<Provider store={store}><LoginMenu /></Provider>);
    const studentButton = screen.getByText('Sign in as a Student');
    const employerButton = screen.getByText('Sign in as an Employer');
    expect(studentButton).toBeInTheDocument();
    expect(employerButton).toBeInTheDocument();
  });
});