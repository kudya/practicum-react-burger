import appStyles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import NotFound404Page from '../../pages/not-found-404-page/not-found-404-page';
import IngredientDetails from "../burger-ingredients/ingredients-list/ingredient-details/ingredient-details";
import Modal from '../modal/modal';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/register'} element={<RegisterPage />} />
                <Route path={'/forgot-password'} element={<ForgotPasswordPage />} />
                <Route path={'/reset-password'} element={<ResetPasswordPage />} />
                <Route path={'/ingredients/:id'} element={<IngredientDetails />} />
                <Route path={'*'} element={<NotFound404Page />} />
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
