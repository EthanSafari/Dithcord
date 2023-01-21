import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPrivateServerAndChat, getOneServer } from '../store/server';

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const startPrivateChat = async (user1id, user2) => {
    if (user1id != useDispatch.id){
      const sessionUserSessions = await fetch(`/api/servers/private/${user1id}/${user2.id}`);
      const sessionUserSessionsData = await sessionUserSessions.json();
      if (sessionUserSessionsData.userPrivateServerToUser.length < 1) {
        await dispatch(createPrivateServerAndChat(user1id, user2))
      }
    }
  }

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        <div onClick={() => startPrivateChat(sessionUser.id, user)}>{user.username}</div>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
