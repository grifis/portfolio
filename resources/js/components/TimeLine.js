import React from 'react';
import { Outlet } from "react-router-dom";

function TimeLine() {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default TimeLine;
