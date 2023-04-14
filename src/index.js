import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

/* This code is rendering the React application to the DOM. It is using the `createRoot` method from
`react-dom/client` to create a root element for the application, and then calling the `render`
method on that root element to render the `App` component wrapped in a `Provider` component (which
provides the Redux store to the application) and a `StrictMode` component (which activates
additional checks and warnings for potential issues in the application). */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
