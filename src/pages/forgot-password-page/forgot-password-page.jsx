import { Link } from 'react-router-dom';
import forgotPasswordPageStyles from './forgot-password-page.module.css';
import useForm from '../../utils/hooks/useForm';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


const ForgotPasswordPage = () => {
    const {form, onChangeForm} = useForm({email: ''});

    const onRestore = () => {};

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
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link className={forgotPasswordPageStyles.link}  to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
