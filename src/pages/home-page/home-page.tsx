import React from 'react';
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import homePageStyles from './home-page.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const HomePage = (): React.JSX.Element => {
    // @ts-ignore
    const { loading, error } = useSelector(store => store.ingredients);

    return (
        <div className={homePageStyles.container}>
            { loading || error ? (
                <p>
                    {loading ? 'Загрузка...' : 'Произошла ошибка при загрузке данных'}
                </p>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            )}
        </div>
    );
};

export default HomePage;
