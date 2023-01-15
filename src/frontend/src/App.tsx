import React from 'react';
import Home from "./component/page/Home";
import Login from "./component/page/Login";
import Register from "./component/page/Register";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./component/page/PrivateRoute";
import MostPopularPostsView from "./component/page/posts/MostPopularPostsView";
import LatestPostsView from "./component/page/posts/LatestPostsView";
import FollowedPostsView from "./component/page/posts/FollowedPostsView";
import MostPopularUsersView from "./component/page/users/MostPopularUsersView";
import FollowedUsersView from "./component/page/users/FollowedUsersView";
import FollowersView from "./component/page/users/FollowersView";
import NewUsersView from "./component/page/users/NewUsersView";
import UserView from "./component/page/users/UserView";
import PostView from "./component/page/posts/PostView";
import CommentsView from "./component/page/posts/CommentsView";
import LikersView from "./component/page/posts/LikersView";
import PostEditView from "./component/page/posts/PostEditView";
import PostCreateView from "./component/page/posts/PostCreateView";
import EditUserView from "./component/page/users/EditUserView";
import FilteredUsers from "./component/page/users/FilteredUsers";

function App() {
    return <div className="app">
        <Routes>
            <Route path="/" element={<PrivateRoute component={<Home/>}/>}>
                <Route path="most-popular-posts" element={<PrivateRoute component={<MostPopularPostsView/>}/>}/>
                <Route path="latest-posts" element={<PrivateRoute component={<LatestPostsView/>}/>}/>
                <Route path="followed-posts" element={<PrivateRoute component={<FollowedPostsView/>}/>}/>
                <Route path="most-popular-users" element={<PrivateRoute component={<MostPopularUsersView/>}/>}/>
                <Route path="followed-users/:userId" element={<PrivateRoute component={<FollowedUsersView/>}/>}/>
                <Route path="followers/:userId" element={<PrivateRoute component={<FollowersView/>}/>}/>
                <Route path="new-users" element={<PrivateRoute component={<NewUsersView/>}/>}/>
                <Route path="users/:filter" element={<PrivateRoute component={<FilteredUsers/>}/>}/>
                <Route path="user/:userId" element={<PrivateRoute component={<UserView/>}/>}/>
                <Route path="post/:postId" element={<PrivateRoute component={<PostView/>}/>}>
                    <Route path="comments" element={<PrivateRoute component={<CommentsView/>}/>}/>
                    <Route path="likers" element={<PrivateRoute component={<LikersView/>}/>}/>
                </Route>
                <Route path="edit-post/:postId" element={<PrivateRoute component={<PostEditView/>}/>}/>
                <Route path="edit-user/:userId" element={<PrivateRoute component={<EditUserView/>}/>}/>
                <Route path="create-post" element={<PrivateRoute component={<PostCreateView/>}/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
}

export default App;
