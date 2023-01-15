import React, {Fragment, useEffect, useState} from "react";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import LoadingSpinner from "../../util/loading-spinner/LoadingSpinner";
import {User} from "../../../model/entity/User";
import CreatePostMapper from "../../util/mapper/edit-create/CreatePostMapper";
import {UserService} from "../../../service/entity/UserService";

const PostCreateView = () => {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);
    const issuerId = localStorage.getItem("issuer_id");

    useEffect(() => {
        setLoading(true);
        UserService.getUser(issuerId!).then(user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    return <Fragment key={user.id}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <Fragment>
                <HeaderPanel text="Create post"/>
                <hr className="item-separator"/>
                <CreatePostMapper user={user}/>
                <hr className="item-separator"/>
            </Fragment>
        }
    </Fragment>;
}

export default PostCreateView;