import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function TimeLine() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async() => {
        const response = await axios.get('/api/user');
        setUsers(response.data.users)
    }

    return (
        <div>
            <NavBar />
            <h1>タイムライン</h1>
            <ul>
                {users.map((user) => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

export default TimeLine;
