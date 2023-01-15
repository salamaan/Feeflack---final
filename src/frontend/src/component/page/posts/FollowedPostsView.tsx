import PostsList from "../../list/posts/PostsList";
import {Pageable} from "../../../model/data/Page";
import React, {Fragment} from "react";
import {UserService} from "../../../service/entity/UserService";
import {useLocation} from "react-router-dom";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const FollowedPostsView = () => {
    const userId = localStorage.getItem('issuer_id');
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <PostsList loadPosts={(pageable: Pageable) => UserService.getPostsOfFollowing(pageable, userId!)}/>
    </Fragment>
}

export default FollowedPostsView;