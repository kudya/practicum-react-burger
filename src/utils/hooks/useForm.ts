import {ChangeEvent, useState} from 'react';

type TUseForm<T> = {
    form: T,
    onChangeForm: (e: ChangeEvent<HTMLInputElement>, field: string) => void,
    autoFillForm: (data: {[key: string]: string}) => void,
}

const useForm = <T>(initialState: T): TUseForm<T>  => {
    const [form, setForm] = useState<T>(initialState)

    const onChangeForm = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setForm(form => ({...form, [field]: e.target.value}))
    };

    const autoFillForm = (data: {[key: string]: string}) => {
        setForm(form => ({...form, ...data}))
    }

    return {form, onChangeForm, autoFillForm};
}

export default useForm;
