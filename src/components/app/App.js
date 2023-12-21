import React from 'react';
import appStyles from './app.module.css';

import AppHeader from "../app-header/app-header";

const App = () => {
  return (
    <div className={appStyles.wrapper}>
      <AppHeader />
    </div>
  );
}

export default App;
