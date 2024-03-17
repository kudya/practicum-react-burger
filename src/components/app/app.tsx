import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import appStyles from './app.module.css';
import { checkUserAuth } from '../../services/actions/auth';
import { loadIngredients } from '../../services/actions/ingredients';
import { clearIngredients } from '../../services/reducers/ingredients';
import { useDispatch } from '../../services/store';

import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import FeedPage from '../../pages/feed-page/feed-page';
import NotFound404Page from '../../pages/not-found-404-page/not-found-404-page';

import AppHeader from '../app-header/app-header';
import IngredientDetails from '../burger-ingredients/ingredients-list/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import Profile from '../profile/profile';
import { OnlyAuth, OnlyUnAuth} from '../protected-route-element/protected-route-element';
import Orders from '../orders/orders';
import FeedOrderDetail from '../feed-orders/feed-order-detail/feed-order-detail';

const App = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(loadIngredients());

        return () => {
            dispatch(clearIngredients());
        }
    }, [])

    const background = location.state && location.state.background;

    const onModalClose = () => {
        navigate(-1);
    };

    const IngredientDetailsModal = () => (
        <Modal title="Детали ингредиента" onClose={onModalClose} >
            <IngredientDetails />
        </Modal>
    );

    const FeedOrderDetailModal = () => (
        <Modal title="#034533" onClose={onModalClose} >
            <FeedOrderDetail withOrderNumber={false}/>
        </Modal>
    );

    return (
        <div className={appStyles.page}>
            <AppHeader />

            <Routes location={background || location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} >
                    <Route path='' element={<Profile />} />
                    <Route path='orders' element={<Orders />} />
                </Route>
                <Route path='/profile/orders/:number' element={<FeedOrderDetail />} />
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/feed/:number' element={<FeedOrderDetail />} />
                <Route path='*' element={<NotFound404Page />} />
            </Routes>

            {background && (
                <Routes>
                    <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
                    <Route path='/feed/:number' element={<FeedOrderDetailModal/>} />
                    <Route path='/profile/orders/:number' element={<FeedOrderDetailModal/>} />
                </Routes>
            )}
        </div>
    );
}

export default App;
