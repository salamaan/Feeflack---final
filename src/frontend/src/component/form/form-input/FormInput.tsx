import React from "react";
import './FormInput.css'
import {InputData} from "../../../model/data/InputData";
import ErrorMessage from "../../error-message/ErrorMessage";

interface FormInputProps {
    input: InputData;
}

const FormInput = (props: FormInputProps) => {
    const {input} = props;

    return (
        <div className="form-input">
            <label htmlFor='name' className="input-label">{input.label}</label>
            <input
                className="input"
                placeholder={input.label.toLowerCase()}
                type={input.type}
                value={input.state.value}
                onChange={input.state.valueChangeHandler}
                onBlur={input.state.inputBlurHandler}
            />
            {input.state.hasError &&
                input.errorMessages.map(message =>
                    <ErrorMessage hasPadding={true} key={message} message={message}/>
                )
            }
        </div>
    );
}

export default FormInput;