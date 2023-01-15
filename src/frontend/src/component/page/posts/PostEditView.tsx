import {useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {Post} from "../../../model/entity/Post";
import {PostService} from "../../../service/entity/PostService";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import LoadingSpinner from "../../util/loading-spinner/LoadingSpinner";
import EditPostMapper from "../../util/mapper/edit-create/EditPostMapper";

const PostEditView = () => {
    const {postId} = useParams();
    const [post, setPost] = useState<Post>({} as Post);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        PostService.getPost(postId!).then(post => {
            setPost(post);
            setLoading(false);
        });
    }, []);


    return <Fragment key={post.id}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <Fragment>
                <HeaderPanel text="Edit post"/>
                <hr className="item-separator"/>
                <EditPostMapper post={post}/>
                <hr className="item-separator"/>
            </Fragment>
        }
    </Fragment>;
}

export default PostEditView;