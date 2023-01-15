import CommentsList from "../../list/comments/CommentsList";
import {Pageable} from "../../../model/data/Page";
import {PostService} from "../../../service/entity/PostService";
import React, {Fragment} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {Post} from "../../../model/entity/Post";

export interface CommentsViewContext {
    post: Post;
    deleteCommentHandler: () => void;
    addCommentHandler: () => void;
}

const CommentsView = () => {
    const {postId} = useParams();
    const context: CommentsViewContext = useOutletContext();

    return <Fragment key={context.post.id}>
            <CommentsList
                deleteCommentHandler={context.deleteCommentHandler}
                addCommentHandler={context.addCommentHandler}
                post={context.post}
                loadComments={(pageable: Pageable) => PostService.getPostComments(pageable, postId!)}
            />
    </Fragment>;
}

export default CommentsView;