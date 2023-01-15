import {Pageable} from "../../../model/data/Page";
import React, {Fragment} from "react";
import UsersList from "../../list/users/UsersList";
import {UserService} from "../../../service/entity/UserService";
import {useLocation} from "react-router-dom";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const MostPopularUsersView = () => {
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <UsersList loadUsers={(pageable: Pageable) => UserService.getMostPopularUsers(pageable)}/>
    </Fragment>
}

export default MostPopularUsersView;