import React from "react";
import Icon from "../picture/icon/Icon";
import AppTitle from "../util/app-title/AppTitle";
import RegisterForm from "../form/RegisterForm";

const Register = () => {
    return <div style={{paddingTop: "20px"}} className="flex flex-column align-center">
        <Icon src="fiflak.svg" size={"120px"}/>
        <AppTitle/>
        <RegisterForm/>
    </div>
}

export default Register;