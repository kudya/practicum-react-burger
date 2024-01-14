import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import appStyles from './app.module.css';
import { loadIngredients } from '../../services/actions/ingredients';
import { clearIngredients } from '../../services/reducers/ingredients';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
    const dispatch = useDispatch();

    const { ingredients, loading, error } = useSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(loadIngredients());

        return () => {
            dispatch(clearIngredients());
        }
    }, [])

    return (
        <div className={appStyles.page}>
            <AppHeader />

            <main className={appStyles.content}>
                { loading || error ? (
                    <p>
                        {loading ? 'Загрузка...' : 'Произошла ошибка при загрузке данных'}
                    </p>
                ) : (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients ingredients={ingredients} />
                        <BurgerConstructor />
                    </DndProvider>
                )}
            </main>
        </div>
    );
}

export default App;
