import Icon from "../../picture/icon/Icon";
import Button from "../../button/Button";
import React, {useState} from "react";
import {AuthenticationService} from "../../../service/AuthenticationService";
import "./MenuPanel.css"
import LinkTag from "../../util/link-text/LinkTag";
import Modal from "../../modal/Modal";
import {UserService} from "../../../service/entity/UserService";
import {useNavigate} from "react-router-dom";

const MenuPanel = () => {
    const issuerId = localStorage.getItem("issuer_id");
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    const onLogoutHandler = () => {
        AuthenticationService.logoutUser().then(null);
    }

    const onDeleteHandler = () => {
        setDeleteModal(true);
    }

    const applyDeleteModal = () => {
        UserService.deleteUser(issuerId!);
        AuthenticationService.logoutUser().then(() => navigate("/login"));
    }

    const cancelDeleteModal = () => {
        setDeleteModal(false);
    }

    return <div className="menu-panel flex flex-column">
        <div style={{padding: "30px 40px 30px 70px"}}>
            <Icon src="fiflak.svg" size={"100px"}/>
        </div>
        <div className="flex flex-row menu-item">
            <div style={{width: "60px", height: "60px"}} className="menu-item-icon">
                <Icon src="home.svg" size={"60px"}/>
            </div>
            <LinkTag to={"/"}>
                <Button text="Home"/>
            </LinkTag>
        </div>
        <div className="flex flex-row menu-item">
            <div style={{width: "60px", height: "60px"}} className="menu-item-icon">
                <Icon src="fiflak.svg" size={"60px"}/>
            </div>
            <LinkTag to={"/create-post"}>
                <Button text="Feef"/>
            </LinkTag>
        </div>
        <div className="flex flex-row menu-item">
            <div style={{width: "60px", height: "60px"}} className="menu-item-icon">
                <Icon src="account.svg" size={"60px"}/>
            </div>
            <LinkTag to={`/user/${issuerId}`}>
                <Button text="Profle"/>
            </LinkTag>
        </div>
        <div className="flex flex-row menu-item">
            <div style={{width: "60px", height: "60px"}} className="menu-item-icon2">
                <Icon src="logout.svg" size={"50px"}/>
            </div>
            <LinkTag to={"/login"}>
                <Button onClickHandler={onLogoutHandler} text="Logout"/>
            </LinkTag>
        </div>
        <div className="flex flex-row menu-item">
            <div style={{width: "60px", height: "60px"}} className="menu-item-icon">
                <Icon src="delete.svg" size={"60px"}/>
            </div>
            <div style={{width: "fit-content"}}>
                <Button onClickHandler={onDeleteHandler} text="Delete"/>
            </div>
        </div>
        {deleteModal &&
            <Modal title="Are you sure to delete the account?"
                   applyHandler={applyDeleteModal}
                   cancelHandler={cancelDeleteModal}
                   body={<div>You will not be able to restore it.</div>}
            />
        }
    </div>
}

export default MenuPanel;