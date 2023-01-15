import {useNavigate} from "react-router-dom";
import React from "react";

interface LinkTextProps {
    to: string;
    children: React.ReactNode
}

const LinkTag = (props: LinkTextProps) => {
    const {children, to} = props;
    const navigate = useNavigate();

    return <div style={{width: "fit-content"}} onClick={() => navigate(to)}>
        {children}
    </div>
}

export default LinkTag;