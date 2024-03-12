import React, { useEffect, FormEvent } from 'react';
import profileStyles from './profile.module.css';
import useForm from '../../utils/hooks/useForm';
import { changeUser } from '../../services/actions/auth';
import { useDispatch, useSelector } from '../../services/store';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {TUserData} from '../../utils/types';

const Profile = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);

    const {form, onChangeForm, autoFillForm} = useForm<Pick<TUserData, 'name' | 'email' | 'password'>>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            autoFillForm(user)
        }
    }, [user])

    const onSaveProfileChanges = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(changeUser(form))
    };

    const onResetProfileChanges = () => {
        autoFillForm({...user, password: ''});
    };

    const isActionsVisible =
        user?.name !== form.name ||
        user.email !== form.email ||
        !!form.password;

    return (
        <div className={`${profileStyles.container} pt-30`}>
            <form className={`${profileStyles.form} mb-20`} onSubmit={onSaveProfileChanges}>
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

                {isActionsVisible && (
                    <div className={profileStyles.actions} >
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={onResetProfileChanges}
                        >
                            Отмена
                        </Button>

                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
