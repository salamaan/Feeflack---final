import PostsList from "../../list/posts/PostsList";
import {Pageable} from "../../../model/data/Page";
import React, {Fragment} from "react";
import {PostService} from "../../../service/entity/PostService";
import {useLocation} from "react-router-dom";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const LatestPostsView = () => {
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <PostsList loadPosts={(pageable: Pageable) => PostService.getPosts(pageable)}/>
    </Fragment>
}

export default LatestPostsView;