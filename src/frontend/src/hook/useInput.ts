import React, { useState } from 'react';

export interface InputState {
    value: any;
    isValid: boolean;
    hasError: boolean;
    valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const useInput = (
    validateValue: (value: any) => boolean
) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(value);
    const hasError = !isValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
    };

    return {
        value,
        isValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
    } as InputState;
};