import UsersList from "../../list/users/UsersList";
import {Pageable} from "../../../model/data/Page";
import {UserService} from "../../../service/entity/UserService";
import {useLocation} from "react-router-dom";
import React, {Fragment} from "react";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const NewUsersView = () => {
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <UsersList loadUsers={(pageable: Pageable) => UserService.getUsers(pageable)}/>
    </Fragment>
}

export default NewUsersView;