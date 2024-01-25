import appStyles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';

const App = () => {
    return (
        <div className={appStyles.page}>
            <AppHeader />

            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/login'} element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
