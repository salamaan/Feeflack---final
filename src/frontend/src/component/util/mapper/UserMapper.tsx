import ProfilePicture from "../../picture/profile-picture/ProfilePicture";
import Date from "../date/Date";
import LinkTag from "../link-text/LinkTag";
import React from "react";
import {User} from "../../../model/entity/User";

interface UserMapperProps {
    user: User;
    followButton: (user: User) => JSX.Element;
    editButton?: (user: User) => JSX.Element;
}

const UserMapper = (props: UserMapperProps) => {
    const {user, followButton, editButton} = props;
    const issuerId = localStorage.getItem('issuer_id');

    return <div className="flex flex-row user">
        <div className="user-profiler-picture">
            <ProfilePicture user={user}/>
        </div>
        <div className="user-content">
            <div className="flex flex-row user-header">
                <LinkTag to={`/user/${user.id}`}>
                    <span className="username">
                        {user.username}
                    </span>
                </LinkTag>
                <div className="user-creation-date">
                    Joined <Date date={user.createdAt}/>
                </div>
                <div className="post-buttons flex flex-row">
                    {issuerId != user.id &&
                        <div className="follow-button flex align-right">
                            {followButton(user)}
                        </div>
                    }
                    {editButton &&
                        <div className="follow-button flex align-right">
                            {editButton(user)}
                        </div>
                    }
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
            <p className="user-description">
                {user.description}
            </p>
        </div>
    </div>
}

export default UserMapper;