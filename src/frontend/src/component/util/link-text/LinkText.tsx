import {Link} from "react-router-dom";
import React from "react";

interface LinkTextProps {
    to: string;
    text: string;
}

const LinkText = (props: LinkTextProps) => {
    const {text, to} = props;

    return <Link to={to} className="special-text">
        {text}
    </Link>
}

export default LinkText;