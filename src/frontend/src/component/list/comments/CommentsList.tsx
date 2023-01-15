import React, {Fragment, useState} from "react";
import ItemsList from "../ItemsList";
import {Page, Pageable} from "../../../model/data/Page";
import {Comment, CreateCommentRequest} from "../../../model/entity/Comment";
import {PaginationService} from "../../../service/util/PaginationService";
import "./CommentsList.css"
import CommentMapper from "../../util/mapper/CommentMapper";
import {CommentService} from "../../../service/entity/CommentService";
import {Post} from "../../../model/entity/Post";
import CreateCommentMapper from "../../util/mapper/edit-create/CreateCommentMapper";

interface CommentsListProps {
    loadComments: (pageable: Pageable) => Promise<Page<Comment>>;
    post: Post;
    deleteCommentHandler: () => void;
    addCommentHandler: () => void;
}

const CommentsList = (props: CommentsListProps) => {
    const [comments, setComments] = useState<Page<Comment>>(PaginationService.getDefaultPage<Comment>());

    const {
        loadComments,
        post,
        deleteCommentHandler,
        addCommentHandler
    } = props;

    const deleteHandler = (commentId: string) => {
        CommentService.deleteComment(commentId).then(() => {
                deleteCommentHandler();
                setComments(prev => {
                    const newContent = comments.content.filter(comment => comment.id !== commentId);
                    return {...prev, content: newContent};
                })
            }
        )
    }

    const editHandler = (commentId: string, newCommentContent: string) => {
        CommentService.updateComment(commentId, newCommentContent).then(() => {
                setComments(prev => {
                    const newContent = comments.content.map(comment =>
                        comment.id === commentId
                            ? {...comment, content: newCommentContent}
                            : comment
                    )
                    return {...prev, content: newContent};
                })
            }
        )
    }

    const createHandler = (userId: string, commentContent: string) => {
        CommentService.createComment({commentedById: userId, commentedPostId: post.id, content: commentContent} as CreateCommentRequest)
            .then(comment => {
                addCommentHandler();
                setComments(prev => {
                    const newContent = [comment, ...prev.content];
                    return {...prev, content: newContent};
                })
            }
        )
    }

    const mapComment = (comment: Comment) => {
        return <CommentMapper editComment={editHandler} comment={comment} deleteComment={deleteHandler} post={post}/>
    }

    return <Fragment>
        <CreateCommentMapper createCommentHandler={createHandler}/>
        <hr className="item-separator"/>
        <ItemsList
            loadItems={loadComments}
            mapItem={mapComment}
            items={comments}
            setItems={setComments}
        />
    </Fragment>
}

export default CommentsList;