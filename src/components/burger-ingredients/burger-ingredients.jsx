import {useMemo, useState, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import { ingredientPropTypes } from '../../utils/propTypes'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from "./ingredients-list/ingredients-list";

const INGREDIENT_TYPES = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main',
}

const BurgerIngredients = ({ingredients}) => {
    const tabsRef = useRef();
    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainsRef = useRef();

    const [currentTab, setCurrentTab] = useState('bun');

    useEffect(() => {
        window.addEventListener('onScroll', handleScroll);

        return () => {
            window.removeEventListener('onScroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const tabsCoords = tabsRef.current.getBoundingClientRect().bottom;
        const bunsCoords = bunsRef.current.getBoundingClientRect().top;
        const saucesCoords = saucesRef.current.getBoundingClientRect().top;
        const mainsCoords = mainsRef.current.getBoundingClientRect().top;

        const ingredientsRefsMap = [
            {
                code: INGREDIENT_TYPES.bun,
                distToTabs: Math.abs(tabsCoords - bunsCoords),
            },
            {
                code: INGREDIENT_TYPES.sauce,
                distToTabs: Math.abs(tabsCoords - saucesCoords),
            },
            {
                code: INGREDIENT_TYPES.main,
                distToTabs: Math.abs(tabsCoords - mainsCoords),
            },
        ];

        const tab = ingredientsRefsMap.reduce((prev, curr) => {
            return prev.distToTabs < curr.distToTabs ? prev : curr
        });

        setCurrentTab(tab.code);
    };

    const { bun: constructorBun, ingredients: constructorIngredients } = useSelector(store => store.burgerConstructor)

    const ingredientsCounter = useMemo(()  => {
        if (constructorIngredients.length) {
            return constructorIngredients.reduce((total, ingredient) => {
                if (total[ingredient._id]) {
                    total[ingredient._id] = total[ingredient._id] + 1;
                } else {
                    total[ingredient._id] = 1;
                }

                return total
            }, {});
        }
    }, [constructorIngredients])

    const bunsCounter = useMemo(()  => {
        if (constructorBun) {
            return {[constructorBun._id]: 2};
        }
    }, [constructorBun])

    return (
        <section>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

            <div ref={tabsRef} className={`${burgerIngredientsStyles.tabs} mb-10`}>
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

            <div onScroll={handleScroll} className={`${burgerIngredientsStyles.content} custom-scroll`}>
                <div ref={bunsRef}>
                    <IngredientsList
                        ingredients={ingredients?.filter(ingredient => ingredient.type === INGREDIENT_TYPES.bun)}
                        counter={bunsCounter}
                        title="Булки"
                    />
                </div>

                <div ref={saucesRef}>
                    <IngredientsList
                        ingredients={ingredients?.filter(ingredient => ingredient.type === INGREDIENT_TYPES.sauce)}
                        counter={ingredientsCounter}
                        title="Соусы"
                    />
                </div>

                <div ref={mainsRef}>
                    <IngredientsList
                        ingredients={ingredients?.filter(ingredient => ingredient.type === INGREDIENT_TYPES.main)}
                        counter={ingredientsCounter}
                        title="Начинки"
                    />
                </div>
            </div>

        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
};

export default BurgerIngredients;
