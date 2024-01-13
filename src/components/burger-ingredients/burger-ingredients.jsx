import {useState} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import { ingredientPropTypes } from '../../utils/propTypes'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from "./ingredients-list/ingredients-list";

const BurgerIngredients = ({ingredients}) => {
    const [currentTab, setCurrentTab] = useState('bun')

    return (
        <section>
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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.shape({
        buns: PropTypes.arrayOf(ingredientPropTypes),
        sauces: PropTypes.arrayOf(ingredientPropTypes),
        mains: PropTypes.arrayOf(ingredientPropTypes),
    })
};

export default BurgerIngredients;
