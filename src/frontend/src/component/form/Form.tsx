import FormInput from "./form-input/FormInput";
import {InputData} from "../../model/data/InputData";
import {FormEvent} from "react";
import './Form.css'

interface FormProps {
    inputs: InputData[];
    onSubmitHandler: () => void;
    submitButton: JSX.Element;
    navigationText?: JSX.Element;
}

const Form = (props: FormProps) => {
    const {inputs, onSubmitHandler, submitButton, navigationText} = props;

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitHandler();
    };

    return <div className="form">
        <form onSubmit={submitHandler}>
            {inputs && inputs.map(input =>
                <FormInput key={input.label} input={input}/>
            )}
            {submitButton}
            {navigationText}
        </form>
    </div>
}

export default Form;