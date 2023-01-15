import React from "react";
import {Post} from "../../../model/entity/Post";
import Picture from "../Picture";
import './PostPicture.css'

interface PostPictureProps {
    post: Post;
}

const PostPicture = (props: PostPictureProps) => {
    const {post} = props;

    return <Picture
        src={`http://localhost:8080/api/posts/${post.id}/picture`}
        className="post-picture"
    />
}

export default PostPicture;