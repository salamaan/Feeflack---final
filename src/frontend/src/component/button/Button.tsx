import React from "react";
import "./Button.css"

interface ButtonProps {
    text: string;
    onClickHandler?: () => void;
    disabled?: boolean;
    type?: ButtonType;
}

export type ButtonType = "button" | "submit";

const Button = (props: ButtonProps) => {
    const {onClickHandler, text, disabled, type = "button" as ButtonType} = props;

    return <button
        className="app-button"
        onClick={onClickHandler}
        disabled={disabled}
        type={type}
    >
        {text}
    </button>
}

export default Button;