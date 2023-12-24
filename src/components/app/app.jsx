import {useEffect, useState} from 'react';
import appStyles from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

const STATUS = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: 'failed',
}

const INGREDIENT_TYPES = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main',
}

const App = () => {
    const [status, setStatus] = useState(STATUS.idle)
    const [error, setError] = useState(null)
    const [ingredients, setIngredients] = useState({
        buns: [],
        sauces: [],
        mains: [],
    })
    const [order, setOrder] = useState({bun: {}, content: []})

    useEffect(() => {
        getIngredientsData();

        return () => {
            clear();
        }
    }, [])

    const getIngredientsData = async () => {
        try {
            setError(null);
            setStatus(STATUS.loading);

            let buns = [];
            let sauces = [];
            let mains = [];

            const res = await fetch(INGREDIENTS_URL);
            const { data } = await res.json();

            data.forEach((ingredient) => {
                switch (ingredient.type) {
                    case INGREDIENT_TYPES.bun:
                        buns.push(ingredient);
                        break;

                    case INGREDIENT_TYPES.sauce:
                        sauces.push(ingredient);
                        break;

                    case INGREDIENT_TYPES.main:
                        mains.push(ingredient);
                        break;

                    default:
                        break;
                }
            })

            setIngredients({buns, sauces, mains});

            setOrder({
                bun: data[0],
                content: data.slice(1, -1),
            })

            setStatus(STATUS.succeeded);
        } catch (e) {
            setStatus(STATUS.failed);
            setError(e.message);
            setError(null);

        }
    }

    const clear = () => {
        setStatus(STATUS.idle);
        setError(null);
        setIngredients({
            buns: [],
            sauces: [],
            mains: [],
        });
        setOrder({bun: {}, content: []});
    }


  return (
    <div className={appStyles.page}>
        <AppHeader />

        <main className={appStyles.content}>
            { status === STATUS.loading || status === STATUS.failed ? (
                <p>
                    {status === STATUS.loading ? 'Загрузка...' : 'Произошла ошибка при загрузке данных'}
                </p>
            ) : (
                <>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor order={order} />
                </>
            )}
        </main>
    </div>
  );
}

export default App;
