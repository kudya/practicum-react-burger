import { useState } from 'react';
import registerPageStyles from './register-page.module.css';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';


const RegisterPage = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onNameChange = e => setName(e.target.value)
    const onEmailChange = e => setEmail(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)
    return (
        <div className={registerPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Регистрация
            </h2>

            <Input
                value={name}
                placeholder={'Имя'}
                extraClass="mb-6"
                onChange={onNameChange}
            />

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
                Зарегистрироваться
            </Button>

            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы? Войти
            </p>
        </div>
    );
};

export default RegisterPage;
