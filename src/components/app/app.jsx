import React from 'react';
import appStyles from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

const App = () => {
  return (
    <div className={appStyles.page}>
        <AppHeader />

        <main className={appStyles.content}>
            <BurgerIngredients />
            <BurgerIngredients />
        </main>
    </div>
  );
}

export default App;
