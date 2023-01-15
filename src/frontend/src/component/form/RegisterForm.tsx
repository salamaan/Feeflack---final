import React, {Fragment, useState} from "react";
import {useInput} from "../../hook/useInput";
import {HttpService} from "../../service/HttpService";
import Form from "./Form";
import {UserService} from "../../service/entity/UserService";
import {CreateUserRequest} from "../../model/entity/User";
import {InputData} from "../../model/data/InputData";
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../error-message/ErrorMessage";
import LinkText from "../util/link-text/LinkText";

const isUsernameValid = (username: string) => {
    return new RegExp("^[a-zA-Z\\d]{4,15}$").test(username);
}

const isPasswordValid = (username: string) => {
    return new RegExp("^[a-zA-Z\\d]{8,20}$").test(username);
}

const isEmailValid = (username: string) => {
    return new RegExp("^(?=.{1,64}@)[A-Za-z\\d_-]+(\\.[A-Za-z\\d_-]+)*@"
        + "[^-][A-Za-z\\d-]+(\\.[A-Za-z\\d-]+)*(\\.[A-Za-z]{2,})$").test(username);
}

const RegisterForm = () => {
    const [apiError, setApiError] = useState<string | null>(null);
    const navigate = useNavigate();

    const username = useInput(isUsernameValid);
    const password = useInput(isPasswordValid);
    const email = useInput(isEmailValid);

    const inputs = [
        {
            label: "Username",
            type: "text",
            state: username,
            errorMessages: [
                "Should be between 4 and 15 characters",
                "Can only contain digits and letters"
            ]
        },
        {
            label: "Password",
            type: "password",
            state: password,
            errorMessages: [
                "Should be between 8 and 20 characters",
                "Can only contain digits and letters"
            ]
        },
        {
            label: "Email",
            type: "email",
            state: email,
            errorMessages: [
                "Wrong format",
                "Example: figaro13@gmail.com"
            ]
        },
    ] as InputData[];

    const formIsValid = !inputs.some(input => !input.state.isValid);
    const submitButton = <Button text="Register" disabled={!formIsValid} type={"submit"}/>;
    const navigationText = <p>
        Already have an account?&nbsp;
        <LinkText to={"/login"} text="Log in here"/>
    </p>;

    const onSubmitHandler = () => {
        if (!formIsValid) {
            return;
        }

        UserService.createUser({
            username: username.value,
            email: email.value,
            password: password.value
        } as CreateUserRequest)
            .then(() => navigate("/login"))
            .catch(error => setApiError(HttpService.getError(error).message));
    };

    return <Fragment>
        <Form
            inputs={inputs}
            onSubmitHandler={onSubmitHandler}
            submitButton={submitButton}
            navigationText={navigationText}
        />
        {apiError && <ErrorMessage hasPadding={false} message={apiError}/>}
    </Fragment>
}

export default RegisterForm;