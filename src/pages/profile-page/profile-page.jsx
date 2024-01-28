import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import profilePageStyles from './profile-page.module.css';
import {logout} from '../../services/actions/auth';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const match = useMatch('/profile');

    const onLogout = () => dispatch(logout())

    return (
        <div className={profilePageStyles.container}>
            <nav className={`${profilePageStyles.nav} pt-30`}>
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

            <Outlet />
        </div>
    );
};

// Profile.propTypes = {
//
// };

export default ProfilePage;
