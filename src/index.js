import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import promiseFinally from 'promise.prototype.finally';

import './reset.css';
import './index.css';
import App from './components/App';

import moviesStore from './stores/moviesStore';

// initialize stores (only need one for now)
const stores = {
  moviesStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

// shim finally() for promises
promiseFinally.shim();

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('root'));
