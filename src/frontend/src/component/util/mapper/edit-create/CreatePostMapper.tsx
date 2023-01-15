import ProfilePicture from "../../../picture/profile-picture/ProfilePicture";
import LinkTag from "../../link-text/LinkTag";
import React, {Fragment, useEffect, useState} from "react";
import {CreatePostRequest} from "../../../../model/entity/Post";
import "./PostUpsert.css"
import Button from "../../../button/Button";
import {useNavigate} from "react-router-dom";
import PictureUploader from "../../../picture/PictureUploader";
import Picture from "../../../picture/Picture";
import {PostService} from "../../../../service/entity/PostService";
import Icon from "../../../picture/icon/Icon";
import {User} from "../../../../model/entity/User";

interface CreatePostMapperProps {
    user: User;
}

const CreatePostMapper = (props: CreatePostMapperProps) => {
    const {user} = props;
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    useEffect(() => {
        addAutoResize();
    }, []);

    const uploadImageHandler = (file: File, url: string) => {
        setFile(file);
        setUrl(url);
    }

    const applyHandler = () => {
        PostService
            .createPost({postedById: user.id, content: content} as CreatePostRequest)
            .then(post => {
                if (file !== null) {
                    const picture = new FormData();
                    picture.append('picture', file);
                    PostService.updatePostPicture(post.id, picture)
                        .then(() => navigate(`/user/${user.id}`))
                } else {
                    navigate(`/user/${user.id}`)
                }
            })
    }

    const onChangeHandler = (event: any) => {
        if (event.target.value.length <= 800) {
            setContent(event.target.value);
        }
    }

    const addAutoResize = () => {
        const element: HTMLElement = document.getElementById("edit-post-description")!;
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;
        element.addEventListener('input', (event: any) => {
            event.target!.style.height = 'auto';
            event!.target.style.height = event.target.scrollHeight + offset + 'px';
        });
    }

    return <div className="flex flex-row edit-post">
        <div className="edit-post-author-picture">
            <ProfilePicture user={user}/>
        </div>
        <div className="edit-post-content">
            <div className="flex flex-row edit-post-header">
                <LinkTag to={`/user/${user.id}`}>
                        <span className="edit-post-author-username">
                            {user.username}
                        </span>
                </LinkTag>
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

export default CreatePostMapper;