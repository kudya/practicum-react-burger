import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const NavItem = ({children, text}) => {
        return (
            <div className={`${appHeaderStyles['nav-item']} mr-2 pt-4 pr-5 pb-4 pl-5 `}>
                {children}
                <p className="text text_type_main-default ml-2">{text}</p>
            </div>
        )
    }

    return (
        <header className={`${appHeaderStyles['app-header']} pt-4 pb-4`}>
            <nav className={appHeaderStyles['nav']}>
                <div className={appHeaderStyles['nav-wrapper']}>
                    <NavItem text="Конструктор">
                        <BurgerIcon type='primary'/>
                    </NavItem>

                    <NavItem text="Лента заказов">
                        <ListIcon type='primary'/>
                    </NavItem>
                </div>

                <Logo/>

                <div className={appHeaderStyles['nav-wrapper']}>
                    <NavItem text="Лента заказов">
                        <ProfileIcon type="primary"/>
                    </NavItem>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
