import {useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../../util/loading-spinner/LoadingSpinner";
import HeaderPanel from "../../panel/main-panel/HeaderPanel";
import {User} from "../../../model/entity/User";
import {UserService} from "../../../service/entity/UserService";
import EditUserMapper from "../../util/mapper/edit-create/EditUserMapper";

const EditUserView = () => {
    const {userId} = useParams();
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        UserService.getUser(userId!).then(user => {
            setUser(user);
            setLoading(false);
        });
    }, [userId]);

    return <Fragment key={userId}>
        {loading && <LoadingSpinner/>}
        {!loading &&
            <Fragment>
                <HeaderPanel text="Edit your account data"/>
                <hr className="item-separator"/>
                <EditUserMapper user={user}/>
                <hr className="item-separator"/>
            </Fragment>
        }
    </Fragment>;
}

export default EditUserView;