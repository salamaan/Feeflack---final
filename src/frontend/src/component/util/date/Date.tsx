import {DateService} from "../../../service/util/DateService";
import React from "react";

interface DateProps {
    date: string;
}

const Date = (props: DateProps) => {
    const {date} = props;

    return <span>
        {DateService.formatDate(date)}
    </span>
}

export default Date;