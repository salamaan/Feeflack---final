import React from "react";
import LoginForm from "../form/LoginForm";
import Icon from "../picture/icon/Icon";
import AppTitle from "../util/app-title/AppTitle";

const Login = () => {
    return <div style={{paddingTop: "20px"}} className="flex flex-column align-center">
        <Icon src="fiflak.svg" size={"120px"}/>
        <AppTitle/>
        <LoginForm/>
    </div>
}

export default Login;