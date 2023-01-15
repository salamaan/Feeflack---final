import React, {useState} from "react";
import {UserService} from "../../../service/entity/UserService";

interface MainPanelHeaderProps {
    path?: string;
    text?: string;
}

const HeaderPanel = (props: MainPanelHeaderProps) => {
    const {path, text} = props;
    const [username, setUsername] = useState("");

    let header = "";

    if(text) {
        header = text;
    }

    if(path && !text) {
        header = path.slice(1).replaceAll("-", ' ');
        header = header.at(0)!.toUpperCase() + header.slice(1);

        if (header.includes("/")) {
            const slashIndex = header.indexOf("/");
            const id = header.slice(slashIndex + 1);
            UserService.getUser(id)
                .then(user => setUsername(user.username));
            header = header.slice(0, slashIndex);
            header += ` of ${username}`
        }
    }

    return <div className="main-panel-header">
        {header}
    </div>
}

export default HeaderPanel;