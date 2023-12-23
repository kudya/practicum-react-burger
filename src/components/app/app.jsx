import {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import {ingredientsData} from "../../utils/data";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


const INGREDIENT_TYPES = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main',
}

const App = () => {
    const [ingredients, setIngredients] = useState({
        buns: [],
        sauces: [],
        mains: [],
    })
    const [order, setOrder] = useState({bun: {}, content: []})

    useEffect(() => {
        let buns = [];
        let sauces = [];
        let mains = [];

        ingredientsData.forEach((ingredient) => {
            switch (ingredient.type) {
                case INGREDIENT_TYPES.bun:
                    buns.push(ingredient)
                    break;

                case INGREDIENT_TYPES.sauce:
                    sauces.push(ingredient)
                    break;

                case INGREDIENT_TYPES.main:
                    mains.push(ingredient)
                    break;

                default:
                    break;
            }
        })

        setIngredients({buns, sauces, mains});

        setOrder({
            bun: ingredientsData[0],
            content: ingredientsData.slice(1, -1)
        })
    }, [])
  return (
    <div className={appStyles.page}>
        <AppHeader />

        <main className={appStyles.content}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor order={order} />
        </main>
    </div>
  );
}

export default App;
