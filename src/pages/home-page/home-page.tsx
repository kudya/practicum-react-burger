import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import homePageStyles from './home-page.module.css';
import { loadIngredients } from '../../services/actions/ingredients';
import { clearIngredients } from '../../services/reducers/ingredients';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const HomePage = (): React.JSX.Element => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { loading, error } = useSelector(store => store.ingredients);

    useEffect(() => {
        // @ts-ignore
        dispatch(loadIngredients());

        return () => {
            // @ts-ignore
            dispatch(clearIngredients());
        }
    }, [])

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
