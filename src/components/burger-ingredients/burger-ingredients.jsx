import {useState, useEffect} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import {ingredientsData} from "../../utils/data";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from "./ingredients-list/ingredients-list";

// import PropTypes from 'prop-types';

const INGREDIENT_TYPES = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main',
}

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState('bun')
    const [ingredients, setIngredients] = useState({
        buns: [],
        sauces: [],
        mains: [],
    })

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
    }, [])

    return (
        <section className={burgerIngredientsStyles.wrapper}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

            <div className={`${burgerIngredientsStyles.tabs} mb-10`}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
                    Булки
                </Tab>

                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
                    Соусы
                </Tab>

                <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>

            <div className={`${burgerIngredientsStyles.content} custom-scroll`}>
                <IngredientsList ingredients={ingredients.buns} title="Булки"/>

                <IngredientsList ingredients={ingredients.sauces} title="Соусы"/>

                <IngredientsList ingredients={ingredients.mains} title="Начинки"/>
            </div>

        </section>
    );
};

// BurgerIngredients.propTypes = {
//
// };

export default BurgerIngredients;
