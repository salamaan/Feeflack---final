import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "../../../model/entity/User";
import {UserService} from "../../../service/entity/UserService";
import Button from "../../button/Button";
import LoadingSpinner from "../../util/loading-spinner/LoadingSpinner";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import UserMapper from "../../util/mapper/UserMapper";
import PostsList from "../../list/posts/PostsList";
import {Pageable} from "../../../model/data/Page";
import LinkTag from "../../util/link-text/LinkTag";

const UserView = () => {
    const {userId} = useParams();
    const [user, setUser] = useState<User>({} as User);
    const issuerId = localStorage.getItem('issuer_id')!;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        UserService.getUser(userId!).then(user => {
            setUser(user);
            setLoading(false);
        });
    }, [userId]);

    const followButtonHandler = () => {
        UserService.followUser(issuerId, userId!)
            .then(() => setUser(prevState => {
                const newFollowersCount = {...prevState}.followersCount + 1;
                return {...prevState, isFollowedByIssuer: true, followersCount: newFollowersCount}
            }))
    }

    const unfollowButtonHandler = () => {
        UserService.unfollowUser(issuerId, userId!)
            .then(() => setUser(prevState => {
                const newFollowersCount = {...prevState}.followersCount - 1;
                return {...prevState, isFollowedByIssuer: false, followersCount: newFollowersCount}
            }))
    }

    const followButton = (user: User) => {
        return user.isFollowedByIssuer
            ? <Button text="Unfollow" onClickHandler={unfollowButtonHandler}/>
            : <Button text="Follow" onClickHandler={followButtonHandler}/>
    }

    const userMapper = () => {
        return issuerId == userId
            ? <UserMapper
                user={user}
                followButton={followButton}
                editButton={(user: User) =>
                    <LinkTag to={`/edit-user/${user.id}`}>
                        <Button text={"Edit"}/>
                    </LinkTag>
                }
            />
            : <UserMapper
                user={user}
                followButton={followButton}
            />
    }

    return <Fragment key={userId}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <Fragment>
                {userMapper()}
                <hr className="item-separator"/>
                <HeaderPanel text={`Posts of ${user.username}`}/>
                <hr className="item-separator"/>
                <PostsList loadPosts={(pageable: Pageable) => UserService.getPostsOfUser(pageable, user.id)}/>
            </Fragment>
        }
    </Fragment>;
}

export default UserView;