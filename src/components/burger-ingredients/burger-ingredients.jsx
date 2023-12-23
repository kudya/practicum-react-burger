import {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from "./ingredients-list/ingredients-list";


const BurgerIngredients = ({ingredients}) => {
    const [currentTab, setCurrentTab] = useState('bun')

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
