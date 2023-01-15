import React, {useState} from "react";
import WelcomeAnimation from "../util/welcome-animation/WelcomeAnimation";
import FilterPanel from "../panel/filter-panel/FilterPanel";
import MainPanel from "../panel/main-panel/MainPanel";
import MenuPanel from "../panel/menu-panel/MenuPanel";

const Home = () => {
    const [content, setContent] = useState(<WelcomeAnimation/>);

    const mainContent = <div className="flex flex-row">
            <MenuPanel/>
            <MainPanel/>
            <FilterPanel/>
        </div>;

    setTimeout(() => setContent(mainContent), 4000);

    return content;
}

export default Home;