import React from 'react';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import profilePageStyles from './profile-page.module.css';
import { logout } from '../../services/actions/auth';
import { useDispatch } from '../../services/store';

const ProfilePage = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const match = useMatch('/profile');

    const onLogout = () => dispatch(logout())

    return (
        <div className={profilePageStyles.container}>
            <div className={`${profilePageStyles['nav-wrapper']}`}>
                <nav className={`${profilePageStyles.nav} pt-30 mb-20`}>
                    <NavLink
                        className={`${profilePageStyles['nav-item']} text text_type_main-medium`}
                        to=''
                    >
                        <span className={match ? profilePageStyles['current-tab']: ''}>Профиль</span>
                    </NavLink>

                    <NavLink
                        className={`${profilePageStyles['nav-item']} text text_type_main-medium`}
                        to='orders'
                    >
                        {({isActive}) => (
                            <span className={isActive ? profilePageStyles['current-tab']: ''}>История заказов</span>
                        )}
                    </NavLink>

                    <button
                        className={`${profilePageStyles['nav-item']} ${profilePageStyles.button} text text_type_main-medium text_color_inactive`}
                        onClick={onLogout}
                    >
                        Выход
                    </button>
                </nav>

                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>

            <Outlet />
        </div>
    );
};

export default ProfilePage;
