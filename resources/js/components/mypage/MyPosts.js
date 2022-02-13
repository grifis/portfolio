import React from 'react';
import { Outlet } from "react-router-dom";

function MyPosts(props) {
    return (
        <div>
            <Outlet user={props.user}/>
        </div>
    );
}

export default MyPosts;
