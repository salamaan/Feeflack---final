import Icon from "../../picture/icon/Icon";
import AppTitle from "../app-title/AppTitle";
import React, {Fragment} from "react";

const WelcomeAnimation = () => {
    return <Fragment>
        <Icon hasAnimation={true} src="fiflak.svg" size="350px"/>
        <span className="welcome-text">
            <AppTitle/>
        </span>
    </Fragment>
}

export default WelcomeAnimation;