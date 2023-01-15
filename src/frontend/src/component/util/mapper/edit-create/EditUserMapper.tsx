import LinkTag from "../../link-text/LinkTag";
import Date from "../../date/Date";
import React, {useEffect, useState} from "react";
import {UpdateUserRequest, User} from "../../../../model/entity/User";
import {useNavigate} from "react-router-dom";
import {UserService} from "../../../../service/entity/UserService";
import PictureUploader from "../../../picture/PictureUploader";
import Picture from "../../../picture/Picture";
import Button from "../../../button/Button";
import Icon from "../../../picture/icon/Icon";

interface EditUserMapperProps {
    user: User;
}

const EditUserMapper = (props: EditUserMapperProps) => {
    const {user} = props;
    const defaultPicture = "default_profile_picture.png";
    const [url, setUrl] = useState(user.hasProfilePicture ? `http://localhost:8080/api/users/${user.id}/picture` : defaultPicture);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [description, setDescription] = useState(user.description);

    useEffect(() => {
        addAutoResize();
    }, []);

    const uploadImageHandler = (file: File, url: string) => {
        setFile(file);
        setUrl(url);
    }

    const onChangeHandler = (event: any) => {
        if (event.target.value.length <= 800) {
            setDescription(event.target.value);
        }
    }

    const applyHandler = () => {
        UserService
            .updateUser(user.id, {description: description, hasPicture: url !== defaultPicture} as UpdateUserRequest)
            .then(() => {
                if (file !== null) {
                    const picture = new FormData();
                    picture.append('picture', file);
                    UserService.updateProfilePicture(user.id, picture)
                        .then(() => navigate(-1))
                } else {
                    navigate(-1)
                }
            })
    }

    const addAutoResize = () => {
        const element: HTMLElement = document.getElementById("edit-post-description")!;
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;
        element.style.height = element.scrollHeight.toString() + 'px';

        element.addEventListener('input', (event: any) => {
            event.target!.style.height = 'auto';
            event!.target.style.height = event.target.scrollHeight + offset + 'px';
        });
    }

    return <div className="flex flex-row user">
        <div className="user-profiler-picture">
            <div className="remove-icon-user" onClick={() => {
                setUrl(defaultPicture);
                setFile(null);
            }}>
                <Icon src={"X.svg"} size={"15px"}/>
            </div>
            <Picture src={url} className="profile-picture"/>
            <div className="profile-picture-editor">
                <PictureUploader setPicture={uploadImageHandler}/>
            </div>
        </div>
        <div className="user-content-edit">
            <div className="flex flex-row user-header">
                <LinkTag to={`/user/${user.id}`}>
                    <span className="username">
                        {user.username}
                    </span>
                </LinkTag>
                <div className="user-creation-date">
                    Joined <Date date={user.createdAt}/>
                </div>
            </div>
            <div className="flex flex-row followers-following">
                <div className="followers">
                    <LinkTag to={`/followers/${user.id}`}>
                            <span className="followers-following-number">
                                {user.followersCount}
                            </span>
                        <span className="followers-following-description">
                                Followers
                            </span>
                    </LinkTag>
                </div>
                <div className="following">
                    <LinkTag to={`/followed-users/${user.id}`}>
                            <span className="followers-following-number">
                                    {user.followingCount}
                                </span>
                        <span className="followers-following-description">
                                    Following
                                </span>
                    </LinkTag>
                </div>
            </div>
            <textarea
                defaultValue={description}
                onChange={onChangeHandler}
                id={"edit-post-description"}
                className="user-description-edit"
                maxLength={800}
                placeholder={"Who are you?"}
            />
            <footer className="edit-post-actions flex">
                <Button text={"Apply"} onClickHandler={applyHandler}/>
                <Button text={"Cancel"} onClickHandler={() => navigate(-1)}/>
            </footer>
        </div>
    </div>
}

export default EditUserMapper;