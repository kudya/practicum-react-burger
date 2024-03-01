import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loginPageStyles from './login-page.module.css';
import useForm from '../../utils/hooks/useForm';
import { login } from '../../services/actions/auth';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import {TUserData} from '../../utils/types';

const LoginPage = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const {form, onChangeForm} = useForm<Pick<TUserData, 'email' | 'password'>>({
        email: '',
        password: '',
    });

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(login(form))
    };

    return (
        <div className={loginPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Вход
            </h2>

            <form className={`${loginPageStyles.form} mb-20`} onSubmit={onLogin}>
                <EmailInput
                    value={form.email}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'email')}
                />

                <PasswordInput
                    value={form.password}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'password')}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    Вход
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вы — новый пользователь? <Link className={loginPageStyles.link}  to="/register">Зарегистрироваться</Link>
            </p>

            <p className="text text_type_main-default text_color_inactive">
                 Забыли пароль? <Link className={loginPageStyles.link}  to="/forgot-password">Восстановить пароль</Link>
            </p>
        </div>
    );
};

export default LoginPage;
