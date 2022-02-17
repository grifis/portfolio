import React from 'react';
import { Outlet } from "react-router-dom";

function Likes(props) {
    return (
        <div>
            <Outlet user={props.user}/>
        </div>
    );
}

export default Likes;
