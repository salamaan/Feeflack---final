import {Pageable} from "../../../model/data/Page";
import {PostService} from "../../../service/entity/PostService";
import PostsList from "../../list/posts/PostsList";
import React, {Fragment} from "react";
import {useLocation} from "react-router-dom";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";

const MostPopularPostsView = () => {
    const location = useLocation();

    return <Fragment>
        <HeaderPanel path={location.pathname}/>
        <hr className="item-separator"/>
        <PostsList loadPosts={(pageable: Pageable) => PostService.getMostPopularPosts(pageable)}/>
    </Fragment>
}

export default MostPopularPostsView;