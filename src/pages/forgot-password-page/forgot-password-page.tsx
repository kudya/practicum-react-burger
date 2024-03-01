import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import forgotPasswordPageStyles from './forgot-password-page.module.css';
import useForm from '../../utils/hooks/useForm';
import { sendEmailToResetPassword } from '../../utils/api/auth-api';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import {TUserData} from '../../utils/types';

const ForgotPasswordPage = (): React.JSX.Element => {
    const [ error, setError ] = useState(false);

    const navigate = useNavigate();

    const {form, onChangeForm} = useForm<Pick<TUserData, 'email'>>({email: ''});

    const onRestore = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(false)

        const { success } = await sendEmailToResetPassword(form);

        success ? navigate('/reset-password') : setError(true);
    };

    return (
        <div className={forgotPasswordPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h2>

            <form className={`${forgotPasswordPageStyles.form} mb-20`} onSubmit={onRestore}>
                <EmailInput
                    value={form.email}
                    placeholder={'Укажите e-mail'}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'email')}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    Восстановить
                </Button>

                {error && (
                    <p className={`${forgotPasswordPageStyles.error} text text_type_main-small`}>
                        Произошла ошибка при отправке почты
                    </p>
                )}
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link className={forgotPasswordPageStyles.link}  to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
