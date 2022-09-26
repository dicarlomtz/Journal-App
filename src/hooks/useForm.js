import { useEffect, useState, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidators = {} ) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidations, setFormValidations] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        createValidators();
    }, [formState]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidations)) {
            if (formValidations[formValue] !== null) return false;
        }
        return true;
     }, [formValidations]);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidators)) {
            const [fn, errorMessage] = formValidators[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidations(formCheckedValues);
    }

    const setFormSubmittedData = () => {
        setFormSubmitted(!formSubmitted);
    }

    return {
        ...formState,
        ...formValidations,

        onInputChange,
        onResetForm,
        isFormValid,

        formSubmitted,
        setFormSubmittedData,
        formState
    }
}