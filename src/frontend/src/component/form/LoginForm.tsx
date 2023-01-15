import {useInput} from "../../hook/useInput";
import React, {Fragment, useState} from "react";
import {LoginRequest} from "../../model/data/Authentication";
import {AuthenticationService} from "../../service/AuthenticationService";
import {HttpService} from "../../service/HttpService";
import Form from "./Form";
import {InputData} from "../../model/data/InputData";
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../error-message/ErrorMessage";
import LinkText from "../util/link-text/LinkText";

const isNotEmpty = (value: string) => value.trim() !== '';

const LoginForm = () => {
    const [apiError, setApiError] = useState<string | null>(null);
    const navigate = useNavigate();

    const username = useInput(isNotEmpty);
    const password = useInput(isNotEmpty);

    const inputs = [
        {
            label: "Username",
            type: "text",
            state: username,
            errorMessages: ["Can not be empty"]
        },
        {
            label: "Password",
            type: "password",
            state: password,
            errorMessages: ["Can not be empty"]
        }
    ] as InputData[];

    const formIsValid = !inputs.some(input => !input.state.isValid);
    const submitButton = <Button text="Log in" disabled={!formIsValid} type={"submit"}/>;
    const navigationText = <p>
        Don't have an account yet?&nbsp;
        <LinkText to={"/register"} text="Register here"/>
    </p>;

    const onSubmitHandler = () => {
        if (!formIsValid) {
            return;
        }

        AuthenticationService.loginUser({
            username: username.value,
            password: password.value
        } as LoginRequest)
            .then(() => navigate("/"))
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
};

export default LoginForm;