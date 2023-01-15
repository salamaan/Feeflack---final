import React from "react";
import "./MainPanel.css"
import {Navigate, Outlet, useLocation} from "react-router-dom";

const MainPanel = () => {
    const location = useLocation();

    return <div className="main-panel">
        {location.pathname === "/"
            ? <Navigate to="/followed-posts"/>
            : <Outlet/>
        }
    </div>
}

export default MainPanel;