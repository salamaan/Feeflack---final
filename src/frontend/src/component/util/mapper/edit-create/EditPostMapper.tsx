import ProfilePicture from "../../../picture/profile-picture/ProfilePicture";
import LinkTag from "../../link-text/LinkTag";
import Date from "../../date/Date";
import React, {Fragment, useEffect, useState} from "react";
import {Post, UpdatePostRequest} from "../../../../model/entity/Post";
import "./PostUpsert.css"
import Button from "../../../button/Button";
import {useNavigate} from "react-router-dom";
import PictureUploader from "../../../picture/PictureUploader";
import Picture from "../../../picture/Picture";
import {PostService} from "../../../../service/entity/PostService";
import Icon from "../../../picture/icon/Icon";

interface EditPostMapperProps {
    post: Post;
}

const EditPostMapper = (props: EditPostMapperProps) => {
    const {post} = props;
    const [url, setUrl] = useState(post.hasPicture ? `http://localhost:8080/api/posts/${post.id}/picture` : "");
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [content, setContent] = useState(post.content);

    useEffect(() => {
        addAutoResize();
    }, []);

    const uploadImageHandler = (file: File, url: string) => {
        setFile(file);
        setUrl(url);
    }

    const applyHandler = () => {
        PostService
            .updatePost(post.id, {content: content, hasPicture: url.length > 0} as UpdatePostRequest)
            .then(() => {
                if(file !== null) {
                    const picture = new FormData();
                    picture.append('picture', file);
                    PostService.updatePostPicture(post.id, picture)
                        .then(() => navigate(-1))
                } else {
                    navigate(-1)
                }
            })
    }

    const onChangeHandler = (event: any) => {
        if(event.target.value.length <= 800) {
            setContent(event.target.value);
        }
    }

    const addAutoResize = () => {
        const element: HTMLElement = document.getElementById("edit-post-description")!;
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;
        element.style.height = element.scrollHeight.toString() + 'px'

        element.addEventListener('input', (event: any) => {
            event.target!.style.height = 'auto';
            event!.target.style.height = event.target.scrollHeight + offset + 'px';
        });
    }

    return <div className="flex flex-row edit-post">
        <div className="edit-post-author-picture">
            <ProfilePicture user={post.postedBy}/>
        </div>
        <div className="edit-post-content">
            <div className="flex flex-row edit-post-header">
                <LinkTag to={`/user/${post.postedBy.id}`}>
                        <span className="edit-post-author-username">
                            {post.postedBy.username}
                        </span>
                </LinkTag>
                <div className="edit-post-creation-date">
                    <Date date={post.createdAt}/>
                </div>
            </div>
            <textarea
                defaultValue={content}
                onChange={onChangeHandler}
                id={"edit-post-description"}
                className="edit-post-description"
                maxLength={800}
                placeholder={"What's happening?"}
            />
            {url.length > 0 &&
                <Fragment>
                    <div className="remove-icon" onClick={() => {
                        setUrl("");
                        setFile(null);
                    }}>
                        <Icon src={"X.svg"} size={"20px"}/>
                    </div>
                    <Picture src={url} className="post-picture"/>
                </Fragment>
            }
            <PictureUploader setPicture={uploadImageHandler}/>
            <footer className="edit-post-actions flex">
                <Button text={"Apply"} onClickHandler={applyHandler}/>
                <Button text={"Cancel"} onClickHandler={() => navigate(-1)}/>
            </footer>
        </div>
    </div>
}

export default EditPostMapper;