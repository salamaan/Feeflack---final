import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {Post} from "../../../model/entity/Post";
import {PostService} from "../../../service/entity/PostService";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import LoadingSpinner from "../../util/loading-spinner/LoadingSpinner";
import PostMapper from "../../util/mapper/PostMapper";
import LinkTag from "../../util/link-text/LinkTag";
import {CommentsViewContext} from "./CommentsView";

const PostView = () => {
    const {postId} = useParams();
    const [post, setPost] = useState<Post>({} as Post);
    const [loading, setLoading] = useState(true);
    const {pathname} = useLocation();
    const [activeSection, setActiveSection] = useState(pathname.slice(pathname.lastIndexOf("/") + 1));
    const navigate = useNavigate();

    useEffect(() => {
        setActiveSection(pathname.slice(pathname.lastIndexOf("/") + 1));
    }, [pathname]);

    useEffect(() => {
        setLoading(true);
        PostService.getPost(postId!).then(post => {
            setPost(post);
            setLoading(false);
        });
    }, []);

    const deleteCommentHandler = () => {
        setPost(prev => {
            let newCommentsCount = {...prev}.commentsCount - 1;

            return {...prev, commentsCount: newCommentsCount}
        })
    }

    const addCommentHandler = () => {
        setPost(prev => {
            let newCommentsCount = {...prev}.commentsCount + 1;

            return {...prev, commentsCount: newCommentsCount}
        })
    }

    const setIsLikedByIssuer = (isLiking: boolean) => {
        setPost(prev => {
            let newLikesCount = {...prev}.likesCount;

            if (isLiking) {
                newLikesCount! += 1;
            } else {
                newLikesCount! -= 1;
            }

            return {...prev, isLikedByIssuer: isLiking, likesCount: newLikesCount!};
        })
    };

    const deleteHandler = (postId: string) => {
        PostService.deletePost(postId).then(() => navigate("/followed-posts"))
    }

    return <Fragment key={post.id}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <Fragment>
                <PostMapper post={post} setIsLikedByIssuer={setIsLikedByIssuer} deletePost={deleteHandler}/>
                <hr className="item-separator"/>
                <div className="flex flex-row post-sections align-center post-sections">
                    <LinkTag to="likers">
                        <div className={`post-section ${activeSection === "likers" ? "active-section" : "inactive-section"}`}>
                            <HeaderPanel text="Likers section"/>
                        </div>
                    </LinkTag>
                    <LinkTag to="comments">
                        <div className={`post-section ${activeSection === "comments" ? "active-section" : "inactive-section"}`}>
                            <HeaderPanel text="Comments section"/>
                        </div>
                    </LinkTag>
                </div>
                <hr className="item-separator"/>
                <Outlet context={{post, deleteCommentHandler, addCommentHandler} as CommentsViewContext}/>
            </Fragment>
        }
    </Fragment>;
}

export default PostView;