import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import appStyles from './app.module.css';
import { checkUserAuth } from '../../services/actions/auth';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import NotFound404Page from '../../pages/not-found-404-page/not-found-404-page';
import IngredientDetails from '../burger-ingredients/ingredients-list/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import Profile from '../profile/profile';
import { OnlyAuth, OnlyUnAuth} from '../protected-route-element/protected-route-element';
import Orders from "../orders/orders";

const App = () => {
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkUserAuth());
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
                    <Route exact path='' element={<Profile />} />
                    <Route path='orders' element={<Orders />} />
                </Route>
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path='*' element={<NotFound404Page />} />
            </Routes>

            {background && (
                <Routes>
                    <Route path='/ingredients/:id' element={<IngredientDetailsModal/>} />
                </Routes>
            )}
        </div>
    );
}

export default App;
