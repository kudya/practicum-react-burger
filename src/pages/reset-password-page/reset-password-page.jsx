import resetPasswordPageStyles from './reset-password-page.module.css';
import useForm from '../../utils/hooks/useForm';

import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';


const ResetPasswordPage = () => {
    const {form, onChangeForm} = useForm({password: '', code: ''});

    return (
        <div className={resetPasswordPageStyles.container}>
            <h2 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h2>

            <PasswordInput
                value={form.password}
                extraClass="mb-6"
                onChange={(e) => onChangeForm(e, 'password')}
            />

            <Input
                value={form.code}
                placeholder={'Имя'}
                extraClass="mb-6"
                onChange={(e) => onChangeForm(e, 'code')}
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
