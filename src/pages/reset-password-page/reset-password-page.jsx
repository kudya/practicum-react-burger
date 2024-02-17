import { useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import useForm from '../../utils/hooks/useForm';
import resetPasswordPageStyles from './reset-password-page.module.css';
import { resetPassword } from "../../utils/api/auth-api";

import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPasswordPage = () => {
    const [ error, setError ] = useState(false);

    const navigate = useNavigate();

    const {form, onChangeForm} = useForm({password: '', code: ''});

    const onReset = async (e) => {
        e.preventDefault();

        setError(false)

        const { success } = await resetPassword(form);

        success ? navigate('/login') : setError(true);
    };

    if (!localStorage.getItem('isResetPassCodeSent')) {
        return <Navigate to="/" />
    }

    return (
        <div className={resetPasswordPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h2>

            <form className={`${resetPasswordPageStyles.form} mb-20`} onSubmit={onReset}>
                <PasswordInput
                    value={form.password}
                    placeholder={'Введите новый пароль'}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'password')}
                />

                <Input
                    value={form.code}
                    placeholder={'Введите код из письма'}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'code')}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    Сохранить
                </Button>

                {error && (
                    <p className={`${resetPasswordPageStyles.error} text text_type_main-small`}>
                        Произошла ошибка при сбросе пароля
                    </p>
                )}
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link className={resetPasswordPageStyles.link}  to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default ResetPasswordPage;
