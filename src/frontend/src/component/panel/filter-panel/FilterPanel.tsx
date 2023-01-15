import SearchIcon from "../../picture/search-icon/SearchIcon";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import "./FilterPanel.css"
import "../../button/Button.css"
import LinkButton from "../../button/link-button/LinkButton";

const FilterPanel = () => {
    const issuerId = localStorage.getItem('issuer_id')!;
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onFilterHandler = () => {
        if(inputRef.current!.value.length > 0) {
            navigate(`/users/${inputRef.current!.value}`);
            inputRef.current!.value = "";
        }
    }

    useEffect(() => {
        document.getElementById("search-input")!.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                onFilterHandler();
            }
        });
    }, []);

    return <div className="filter-panel flex flex-column">
        <div className="filter-input flex flex-row">
            <SearchIcon onClickHandler={onFilterHandler}/>
            <input id={"search-input"} ref={inputRef} type="text" placeholder="Search for users"/>
        </div>
        <div className="filter-buttons flex flex-column">
            <div className="filter-button flex flex-column">
                    <span className="filter-header">
                        Posts
                    </span>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={"most-popular-posts"}>
                    <LinkButton text="Most popular posts"/>
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={"followed-posts"}>
                    <LinkButton text="Followed posts"/>
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={"latest-posts"}>
                    <LinkButton text="Latest posts"/>
                </NavLink>
            </div>
            <div className="filter-button flex flex-column">
                    <span className="filter-header">
                        Users
                    </span>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={"most-popular-users"}>
                    <LinkButton text="Most popular users"/>
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={`followed-users/${issuerId}`}>
                    <LinkButton text="Followed users"/>
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={`followers/${issuerId}`}>
                    <LinkButton text="My followers"/>
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? ' active' : ' inactive')} to={"new-users"}>
                    <LinkButton text="New users"/>
                </NavLink>
            </div>
        </div>
    </div>
}

export default FilterPanel;