import React, {Fragment, useEffect, useState} from "react";
import ProfilePicture from "../../../picture/profile-picture/ProfilePicture";
import LinkTag from "../../link-text/LinkTag";
import Button from "../../../button/Button";
import {User} from "../../../../model/entity/User";
import {UserService} from "../../../../service/entity/UserService";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

interface CreateCommentMapperProps {
    createCommentHandler: (userId: string, content: string) => void;
}

const CreateCommentMapper = (props: CreateCommentMapperProps) => {
    const {createCommentHandler} = props;
    const issuerId = localStorage.getItem('issuer_id');
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!loading) {
            autoResize();
        }
    }, [loading])

    useEffect(() => {
        setLoading(true);
        UserService.getUser(issuerId!).then(user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    const applyCreate = () => {
        createCommentHandler(user.id, content);
        setContent("");
    }

    const onChangeHandler = (event: any) => {
        if (event.target.value.length <= 400) {
            setContent(event.target.value);
        }
    }

    const updateElement = (event: any, offset: any) => {
        event.target!.style.height = 'auto';
        event!.target.style.height = event.target.scrollHeight + offset + 'px';
    }

    const autoResize = () => {
        const element: HTMLElement = document.getElementById("create-post-description999")!;
        element.style.boxSizing = 'border-box';
        const offset = element.offsetHeight - element.clientHeight;
        element.addEventListener('input', (event: any) => updateElement(event, offset));
    }

    return <Fragment key={issuerId}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <div className="flex flex-row comment">
                <div className="comment-author-picture">
                    <ProfilePicture user={user}/>
                </div>
                <div className="comment-content">
                    <div className="flex flex-row comment-header">
                        <LinkTag to={`/user/${user.id}`}>
                        <span className="comment-author-username">
                            {user.username}
                        </span>
                        </LinkTag>
                    </div>
                    <textarea
                        value={content}
                        onChange={onChangeHandler}
                        id={"create-post-description999"}
                        className="edit-post-description"
                        maxLength={400}
                        placeholder={"Feef your reply"}
                    />
                    <footer className="edit-post-actions flex">
                        <Button text={"Reply"} onClickHandler={applyCreate}/>
                    </footer>
                </div>
            </div>
        }
    </Fragment>
}

export default CreateCommentMapper;