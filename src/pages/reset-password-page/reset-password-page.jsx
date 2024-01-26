import { useState } from 'react';
import resetPasswordPageStyles from './reset-password-page.module.css';

import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';


const ResetPasswordPage = () => {
    const [password, setPassword] = useState(null);
    const [code, setCode] = useState(null);

    const onPasswordChange = e => setPassword(e.target.value)
    const onCodeChange = e => setCode(e.target.value)

    return (
        <div className={resetPasswordPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h2>

            <PasswordInput
                value={password}
                extraClass="mb-6"
                onChange={onPasswordChange}
            />

            <Input
                value={code}
                placeholder={'Имя'}
                extraClass="mb-6"
                onChange={onCodeChange}
            />

            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
            >
                Сохранить
            </Button>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? Войти
            </p>
        </div>
    );
};

export default ResetPasswordPage;
