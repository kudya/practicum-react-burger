import { useState } from 'react';
import forgotPasswordPageStyles from './forgot-password-page.module.css';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState(null);

    const onEmailChange = e => setEmail(e.target.value)

    return (
        <div className={forgotPasswordPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h2>

            <EmailInput
                value={email}
                placeholder={'Укажите e-mail'}
                extraClass="mb-6"
                onChange={onEmailChange}
            />

            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
            >
                Восстановить
            </Button>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? Войти
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
