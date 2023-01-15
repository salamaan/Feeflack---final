import React from "react";
import {User} from "../../../model/entity/User";
import Picture from "../Picture";
import './ProfilePicture.css'

interface ProfilePictureProps {
    user: User;
}

const ProfilePicture = (props: ProfilePictureProps) => {
    const {user} = props;

    const pictureUrl = user.hasProfilePicture
        ? `http://localhost:8080/api/users/${user.id}/picture`
        : "default_profile_picture.png";

    return <Picture
        src={pictureUrl}
        className="profile-picture"
    />
}

export default ProfilePicture;