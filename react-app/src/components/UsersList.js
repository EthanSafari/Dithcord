import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPrivateServerAndChat, getAllServersByUserId } from '../store/server';

// const userImageArray = [
//   'https://th.bing.com/th/id/OIP.2ho_6d77d9hcA_Tr5hDzSAAAAA?pid=ImgDet&rs=1',
//   'https://vignette.wikia.nocookie.net/mike-tyson-mysteries/images/6/60/JohnUpdike.png/revision/latest?cb=20150305165010',
//   'https://th.bing.com/th/id/OIP.MWhiy9DoVs61Gr-nwqySigHaGW?pid=ImgDet&rs=1',
//   'https://vignette.wikia.nocookie.net/mike-tyson-mysteries/images/3/37/Miketysonmysteries_trailer_sdcc14.jpg/revision/latest?cb=20170703025337',
//   'https://th.bing.com/th/id/OIP.ocBGJzV1HEtKuJ2N3HCnBQAAAA?pid=ImgDet&rs=1',
//   'https://th.bing.com/th/id/OIP.D9greJe8UNFrlzuaJCctEwAAAA?pid=ImgDet&rs=1',
//   'https://i1.sndcdn.com/avatars-000414334878-fyyas3-t500x500.jpg',
//   'https://th.bing.com/th/id/OIP.c0jFYmPau8vp-LU01UkD0wAAAA?pid=ImgDet&rs=1',
//   'https://th.bing.com/th/id/OIP.KpFLU2fyaCHLTwR9xGOxHQAAAA?pid=ImgDet&rs=1',
//   'https://th.bing.com/th/id/OIP.aFY5Lh9wiPhd6RWL8NEITgAAAA?pid=ImgDet&rs=1',
//   'https://freddyo.com/wp-content/uploads/2014/10/image31.jpg'
// ]

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

  const startPrivateChat = async (user1, user2) => {
    if (user1.id !== user2.id) {
      const sessionUserSessions = await fetch(`/api/servers/private/${user1.id}/${user2.id}`);
      const sessionUserSessionsData = await sessionUserSessions.json();
      if (sessionUserSessionsData.userPrivateServerToUser.length < 1) {
        await dispatch(createPrivateServerAndChat(user1, user2))
      } else {
        await dispatch(getAllServersByUserId(user1.id))
      }
    }
  }

  const userComponents = users.map((user) => {
    return (
      <div key={user.id} className='private-message-options'>
        {sessionUser.id !== user.id && (
          <div className='private-message-name'>
            <div onClick={() => startPrivateChat(sessionUser, user)} className='user-image-and-name-container'>
              <img className='user-image' src={user.profile_img} alt=''></img>
              <div className='user-name'>
                {user.username}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      <div className='private-messaging'>
        <div className='private-message-heading'>Private Message: </div>
        <div className='private-messaging-list'>{userComponents}</div>
      </div>
    </>
  );
}

export default UsersList;
