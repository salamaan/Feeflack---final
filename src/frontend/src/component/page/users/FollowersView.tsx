import UsersList from "../../list/users/UsersList";
import {Pageable} from "../../../model/data/Page";
import {UserService} from "../../../service/entity/UserService";
import {useLocation, useParams} from "react-router-dom";
import React, {Fragment} from "react";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const FollowersView = () => {
    const {userId} = useParams();
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <UsersList key={userId} loadUsers={(pageable: Pageable) => UserService.getUserFollowers(pageable, userId!)}/>
    </Fragment>
}

export default FollowersView;