import { useState } from 'react';

const useForm = () => {
    const [form, setForm] = useState({})

    const onChangeForm = (e, field) => setForm(form => ({...form, [field]: e.target.value}));

    return [form, onChangeForm];
}

export default useForm;
