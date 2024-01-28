import { useState } from 'react';

const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState)

    const onChangeForm = (e, field) => setForm(form => ({...form, [field]: e.target.value}));

    const autoFillForm = (data) => setForm(form => ({...form, ...data}))

    return {form, onChangeForm, autoFillForm};
}

export default useForm;
