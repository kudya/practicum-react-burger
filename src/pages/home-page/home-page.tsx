import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import homePageStyles from './home-page.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from '../../services/store';

const HomePage = (): React.JSX.Element => {
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
