import React from "react";
import "./ErrorMessage.css"

interface ErrorMessageProps {
    message: string;
    hasPadding: boolean;
}

const ErrorMessage = (props: ErrorMessageProps) => {
    const {message, hasPadding} = props;

    const styles = "flex align-center error-text" +
        (hasPadding ? " error-padding" : "");

    return <div className={styles}>
        <div className={"error-dot"}/>
        <span key={message}>{message}</span>
    </div>
}

export default ErrorMessage;