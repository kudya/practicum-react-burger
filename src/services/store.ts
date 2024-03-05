import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
    TypedUseSelectorHook,
} from "react-redux";
import {socketMiddleware} from "./middlewares/socket-middleware";
import { connect, disconnect } from './actions/webSocket';
import { wsOpen, wsError, wsClose, wsMessage } from './reducers/feedOrdersTotal';

import { ingredientsReducer } from "./reducers/ingredients";
import { burgerConstructorReducer } from "./reducers/burgerConstructor";
import { orderReducer } from './reducers/order';
import { ingredientInfoReducer} from './reducers/ingredientInfo';
import { authReducer } from './reducers/auth';
import { feedOrdersReducer} from './reducers/feedOrdersTotal';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredientInfo: ingredientInfoReducer,
    auth: authReducer,
    feedOrders: feedOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const feedOrdersMiddleware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedOrdersMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

