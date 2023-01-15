import ProfilePicture from "../../picture/profile-picture/ProfilePicture";
import LinkTag from "../link-text/LinkTag";
import Date from "../date/Date";
import React, {Fragment, useEffect, useState} from "react";
import {Comment} from "../../../model/entity/Comment";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import {Post} from "../../../model/entity/Post";

interface CommentMapperProps {
    comment: Comment;
    deleteComment: (commentId: string) => void;
    editComment: (commentId: string, newCommentContent: string) => void;
    post: Post;
}

const CommentMapper = (props: CommentMapperProps) => {
    const {comment, deleteComment, post, editComment} = props;
    const [deleteModal, setDeleteModal] = useState(false);
    const [editView, setEditView] = useState<boolean | null>(null);
    const issuerId = localStorage.getItem('issuer_id');
    const [editContent, setEditContent] = useState(comment.content);

    useEffect(() => {
        if (editView === true) {
            autoResize();
        }
    }, [editView]);

    const editButtonHandler = () => {
        setEditContent(comment.content);
        setEditView(true);
    }

    const applyEdit = () => {
        setEditView(false);
        editComment(comment.id, editContent);
    }

    const cancelEdit = () => {
        setEditContent(comment.content);
        setEditView(false);
    }

    const deleteButtonHandler = () => {
        setDeleteModal(true);
    }

    const applyDeleteModal = () => {
        cancelModal();
        deleteComment(comment.id);
    }

    const cancelModal = () => {
        setDeleteModal(false);
    }

    const onChangeHandler = (event: any) => {
        if (event.target.value.length <= 400) {
            setEditContent(event.target.value);
        }
    }

    const autoResize = () => {
        const element: HTMLElement = document.getElementById(`edit-post-description/${comment.id}`)!;
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;
        element.style.height = element.scrollHeight.toString() + 'px'

        element.addEventListener('input', (event: any) => {
            event.target!.style.height = 'auto';
            event!.target.style.height = event.target.scrollHeight + offset + 'px';
        });
    }

    return <div className="flex flex-row comment">
        <div className="comment-author-picture">
            <ProfilePicture user={comment.commentedBy}/>
        </div>
        <div className="comment-content">
            <div className="flex flex-row comment-header">
                <LinkTag to={`/user/${comment.commentedBy.id}`}>
                        <span className="comment-author-username">
                            {comment.commentedBy.username}
                        </span>
                </LinkTag>
                <div className="comment-creation-date">
                    <Date date={comment.createdAt}/>
                </div>
                {(comment.commentedBy.id == issuerId || post.postedBy.id == issuerId) &&
                    <div className="post-buttons flex flex-row">
                        {deleteModal &&
                            <Modal
                                title="Are you sure to delete the comment?"
                                applyHandler={applyDeleteModal}
                                cancelHandler={cancelModal}
                                body={<div>You will not be able to restore it.</div>}
                            />
                        }
                        {comment.commentedBy.id == issuerId &&
                            <div className="post-button">
                                <Button text={"Edit"} onClickHandler={editButtonHandler}/>
                            </div>
                        }
                        <div className="post-button">
                            <Button text={"Delete"} onClickHandler={deleteButtonHandler}/>
                        </div>
                    </div>
                }
            </div>
            {(editView === false || editView === null) &&
                <p className="comment-description">
                    {comment.content}
                </p>
            }
            {(editView === true && editView !== null) &&
                <Fragment>
                    <textarea
                        defaultValue={editContent}
                        onChange={onChangeHandler}
                        id={`edit-post-description/${comment.id}`}
                        className="edit-post-description"
                        maxLength={400}
                        placeholder={"Feef your reply"}
                    />
                    <footer className="edit-post-actions flex">
                        <Button text={"Apply"} onClickHandler={applyEdit}/>
                        <Button text={"Cancel"} onClickHandler={cancelEdit}/>
                    </footer>
                </Fragment>
            }
        </div>
    </div>
}

export default CommentMapper;