import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import '../index.css';

describe('Index Unit Test', () => {
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
