import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
    TypedUseSelectorHook,
} from "react-redux";
import {socketMiddleware} from "./middlewares/socket-middleware";
import { connect, disconnect } from './actions/webSocket';
import {
    wsOpenFeedOrders,
    wsErrorFeedOrders,
    wsCloseFeedOrders,
    wsMessageFeedOrders
} from './reducers/feedOrdersTotal';
import {
    wsOpenFeedOrdersProfile,
    wsErrorFeedOrdersProfile,
    wsCloseFeedOrdersProfile,
    wsMessageFeedOrdersProfile
} from './reducers/feedOrdersProfile';

import { ingredientsReducer, TIngredientsActions } from "./reducers/ingredients";
import {burgerConstructorReducer, TBurgerConstructorActions} from "./reducers/burgerConstructor";
import { orderReducer } from './reducers/order';
import { ingredientInfoReducer, TIngredientInfoActions} from './reducers/ingredientInfo';
import { authReducer, TAuthActions } from './reducers/auth';
import { feedOrdersReducer, TFeedOrdersTotalActions} from './reducers/feedOrdersTotal';
import { feedOrdersProfileReducer, TFeedOrdersProfileActions } from './reducers/feedOrdersProfile';
import { feedOrderReducer, TFeedOrderActions } from './reducers/feedOrder';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredientInfo: ingredientInfoReducer,
    auth: authReducer,
    feedOrders: feedOrdersReducer,
    feedOrdersProfile: feedOrdersProfileReducer,
    feedOrder: feedOrderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const feedOrdersMiddleware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    onOpen: wsOpenFeedOrders,
    onClose: wsCloseFeedOrders,
    onError: wsErrorFeedOrders,
    onMessage: wsMessageFeedOrders,
})

const feedOrdersProfileMiddleware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    onOpen: wsOpenFeedOrdersProfile,
    onClose: wsCloseFeedOrdersProfile,
    onError: wsErrorFeedOrdersProfile,
    onMessage: wsMessageFeedOrdersProfile,
})

export type TAppActions = TIngredientInfoActions
    | TFeedOrderActions
    | TBurgerConstructorActions
    | TIngredientsActions
    | TAuthActions
    | TFeedOrdersTotalActions
    | TFeedOrdersProfileActions;

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedOrdersMiddleware, feedOrdersProfileMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

