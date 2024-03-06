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

import { ingredientsReducer } from "./reducers/ingredients";
import { burgerConstructorReducer } from "./reducers/burgerConstructor";
import { orderReducer } from './reducers/order';
import { ingredientInfoReducer} from './reducers/ingredientInfo';
import { authReducer } from './reducers/auth';
import { feedOrdersReducer} from './reducers/feedOrdersTotal';
import { feedOrdersProfileReducer } from './reducers/feedOrdersProfile';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredientInfo: ingredientInfoReducer,
    auth: authReducer,
    feedOrders: feedOrdersReducer,
    feedOrdersProfile: feedOrdersProfileReducer,
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

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedOrdersMiddleware, feedOrdersProfileMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

