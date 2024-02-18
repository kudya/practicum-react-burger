import React, { ReactNode } from 'react';
import {NavLink} from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

type TNavItemProps = {
    children: ReactNode,
    text: string,
    textStyle: string,
}

const AppHeader = () => {
    const NavItem = ({children, text, textStyle}: TNavItemProps): React.JSX.Element => {
        return (
            <div className={`${appHeaderStyles['nav-item']} mr-2 pt-4 pr-5 pb-4 pl-5 `}>
                {children}
                <p className={`text text_type_main-default ml-2 ${textStyle}`}>
                    {text}
                </p>
            </div>
        )
    }

    return (
        <header className={`${appHeaderStyles['app-header']} pt-4 pb-4`}>
            <nav className={appHeaderStyles['nav']}>
                <div className={appHeaderStyles['nav-wrapper']}>
                    <NavLink className={appHeaderStyles.link} to="/">
                        {({isActive}) => (
                            <NavItem text="Конструктор"  textStyle={isActive ? '' : 'text_color_inactive'}>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                            </NavItem>
                            )
                        }
                    </NavLink>

                    <NavItem text="Лента заказов" textStyle="text_color_inactive">
                        <ListIcon type='secondary'/>
                    </NavItem>
                </div>

                <Logo/>

                <div className={appHeaderStyles['nav-wrapper']}>
                    <NavLink className={appHeaderStyles.link} to='/profile'>
                        {({isActive}) => (
                            <NavItem text="Личный кабинет" textStyle={isActive ? '' : 'text_color_inactive'}>
                                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                            </NavItem>
                        )}
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
