import { useState } from 'react';
import loginPageStyles from './login-page.module.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


const LoginPage = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onEmailChange = e => setEmail(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)
    return (
        <div className={loginPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Вход
            </h2>

            <EmailInput
                value={email}
                extraClass="mb-6"
                onChange={onEmailChange}
            />

            <PasswordInput
                value={password}
                extraClass="mb-6"
                onChange={onPasswordChange}
            />

            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
            >
                Вход
            </Button>

            <p className="text text_type_main-default text_color_inactive mb-4">
                Вы — новый пользователь? Зарегистрироваться
            </p>

            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? Восстановить пароль
            </p>
        </div>
    );
};

export default LoginPage;
