import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./reducers/ingredients";
import { burgerConstructorReducer } from "./reducers/burgerConstructor";
import { orderReducer } from './reducers/order';
import { ingredientInfoReducer} from './reducers/ingredientInfo';
import { authReducer } from './reducers/auth';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        ingredientInfo: ingredientInfoReducer,
        auth: authReducer,
    }
});