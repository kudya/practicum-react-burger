import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { store } from './services/store';
import './index.css';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
          <Provider store={store}>
              <App />
          </Provider>
      </Router>
  </React.StrictMode>
);

