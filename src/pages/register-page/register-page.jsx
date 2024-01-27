import { useDispatch } from 'react-redux';
import registerPageStyles from './register-page.module.css';
import useForm from '../../utils/hooks/useForm';
import { setUser } from '../../services/actions/auth';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const [form, onChangeForm] = useForm();

    const onRegister = (e) => {
        e.preventDefault();
        dispatch(setUser(form))
    };

    return (
        <div className={registerPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Регистрация
            </h2>

            <form className={`${registerPageStyles.form} mb-20`} onSubmit={onRegister}>
                <Input
                    value={form.name}
                    placeholder={'Имя'}
                    extraClass="mb-6"
                    onChange={(e) => onChangeForm(e, 'name')}
                />

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
                    Зарегистрироваться
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы? Войти
            </p>
        </div>
    );
};

export default RegisterPage;
