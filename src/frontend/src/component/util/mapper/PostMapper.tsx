import ProfilePicture from "../../picture/profile-picture/ProfilePicture";
import LinkTag from "../link-text/LinkTag";
import Date from "../date/Date";
import PostPicture from "../../picture/post-picture/PostPicture";
import LikeIcon from "../../picture/like-icon/LikeIcon";
import CommentIcon from "../../picture/comment-icon/CommentIcon";
import React, {useState} from "react";
import {Post} from "../../../model/entity/Post";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";

interface PostMapperProps {
    post: Post;
    setIsLikedByIssuer: (isLiking: boolean) => void;
    deletePost: (postId: string) => void;
}

const PostMapper = (props: PostMapperProps) => {
    const {post, setIsLikedByIssuer, deletePost, } = props;
    const issuerId = localStorage.getItem('issuer_id');
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteButtonHandler = () => {
        setDeleteModal(true);
    }

    const applyDeleteModal = () => {
        cancelModal();
        deletePost(post.id);
    }

    const cancelModal = () => {
        setDeleteModal(false);
    }

    return <div className="flex flex-row post">
        <div className="post-author-picture">
            <ProfilePicture user={post.postedBy}/>
        </div>
        <div className="post-content">
            <div className="flex flex-row post-header">
                <LinkTag to={`/user/${post.postedBy.id}`}>
                        <span className="post-author-username">
                            {post.postedBy.username}
                        </span>
                </LinkTag>
                <div className="post-creation-date">
                    <Date date={post.createdAt}/>
                </div>
                {post.postedBy.id == issuerId &&
                    <div className="post-buttons flex flex-row">
                        {deleteModal &&
                            <Modal
                                title="Are you sure to delete the post?"
                                applyHandler={applyDeleteModal}
                                cancelHandler={cancelModal}
                                body={<div>You will not be able to restore it.</div>}
                            />
                        }
                        <div className="post-button">
                            <LinkTag to={`/edit-post/${post.id}`}>
                                <Button text={"Edit"}/>
                            </LinkTag>
                        </div>
                        <div className="post-button">
                            <Button text={"Delete"} onClickHandler={deleteButtonHandler}/>
                        </div>
                    </div>
                }
            </div>
            <p className="post-description">
                {post.content}
            </p>
            <div>
                {post.hasPicture && <PostPicture post={post}/>}
            </div>
            <div className="flex flex-row post-icons">
                <div className="post-icon flex">
                    <LikeIcon
                        isAlreadyLiked={post.isLikedByIssuer}
                        postId={post.id}
                        setIsLikedByIssuer={setIsLikedByIssuer}
                    />
                    <span>{post.likesCount}</span>
                </div>
                <div className="post-icon flex">
                    <LinkTag to={`/post/${post.id}/comments`}>
                        <CommentIcon/>
                    </LinkTag>
                    <span>{post.commentsCount}</span>
                </div>
            </div>
        </div>
    </div>
}

export default PostMapper;