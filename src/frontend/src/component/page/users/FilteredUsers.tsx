import {useParams} from "react-router-dom";
import React, {Fragment} from "react";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import UsersList from "../../list/users/UsersList";
import {Pageable} from "../../../model/data/Page";
import {UserService} from "../../../service/entity/UserService";

const FilteredUsers = () => {
    const {filter} = useParams();

    return <Fragment key={filter}>
        <HeaderPanel text={`Users "${filter}"`}/>
        <hr className="item-separator"/>
        <UsersList loadUsers={(pageable: Pageable) => UserService.getUsers(pageable, filter)}/>
    </Fragment>
}

export default FilteredUsers;