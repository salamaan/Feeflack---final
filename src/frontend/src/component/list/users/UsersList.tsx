import {Page, Pageable} from "../../../model/data/Page";
import {User} from "../../../model/entity/User";
import React, {useState} from "react";
import ItemsList from "../ItemsList";
import {PaginationService} from "../../../service/util/PaginationService";
import "./UsersList.css"
import Button from "../../button/Button";
import {UserService} from "../../../service/entity/UserService";
import UserMapper from "../../util/mapper/UserMapper";

interface UsersListProps {
    loadUsers: (pageable: Pageable) => Promise<Page<User>>;
}

const UsersList = (props: UsersListProps) => {
    const [users, setUsers] = useState<Page<User>>(PaginationService.getDefaultPage<User>());
    const issuerId = localStorage.getItem('issuer_id')!;

    const {
        loadUsers
    } = props;

    const followButtonHandler = (userId: string) => {
        UserService.followUser(issuerId, userId)
            .then(() => setUsers(
                    prev => {
                        const newContent = users.content.map(user =>
                            user.id === userId
                                ? {...user, isFollowedByIssuer: true, followersCount: user.followersCount + 1}
                                : user
                        )

                        return {...prev, content: newContent};
                    }
                )
            )
    }

    const unfollowButtonHandler = (userId: string) => {
        UserService.unfollowUser(issuerId, userId)
            .then(() => setUsers(
                    prev => {
                        const newContent = users.content.map(user =>
                            user.id === userId
                                ? {...user, isFollowedByIssuer: false, followersCount: user.followersCount - 1}
                                : user
                        )

                        return {...prev, content: newContent};
                    }
                )
            )
    }

    const followButton = (user: User) => {
        return user.isFollowedByIssuer
            ? <Button text="Unfollow" onClickHandler={() => unfollowButtonHandler(user.id)}/>
            : <Button text="Follow" onClickHandler={() => followButtonHandler(user.id)}/>
    }

    const mapUser = (user: User): JSX.Element => {
        return <UserMapper user={user} followButton={followButton}/>
    }

    return <ItemsList
        loadItems={loadUsers}
        mapItem={mapUser}
        items={users}
        setItems={setUsers}
    />
}

export default UsersList;