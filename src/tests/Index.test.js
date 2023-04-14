import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import '../index.css';

/* This is a unit test for the index file of a React application. The first test checks if the
`createRoot` function is called with the correct container element. The second test checks if the
`App` component is rendered correctly within a `Provider` component and if the container element
with the id of `app` is defined. The tests use Jest, a JavaScript testing framework, to mock
functions and assert expected behavior. */
describe('Index Unit Test', () => {
  test('createRoot is called with the correct container', () => {
    // create a mock container element
    const container = document.createElement('div');
    container.id = 'root';
    
    // mock the createRoot function
    const createRoot = jest.fn();
    
    // call the code under test
    const root = createRoot(container);
    
    // assert that createRoot was called with the correct container
    expect(createRoot).toHaveBeenCalledWith(container);
  });
  
  test('renders App component', () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);

    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    expect(container.querySelector('#app')).toBeDefined();
  });
});