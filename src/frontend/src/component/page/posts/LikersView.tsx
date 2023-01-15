import {Pageable} from "../../../model/data/Page";
import {PostService} from "../../../service/entity/PostService";
import React from "react";
import UsersList from "../../list/users/UsersList";
import {useParams} from "react-router-dom";

const LikersView = () => {
    const {postId} = useParams();

    return <UsersList loadUsers={(pageable: Pageable) => PostService.getPostLikers(pageable, postId!)}/>
}

export default LikersView;