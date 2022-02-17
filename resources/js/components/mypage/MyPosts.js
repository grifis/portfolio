import React from 'react';
import { Outlet } from "react-router-dom";

function MyPosts(props) {
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default MyPosts;
