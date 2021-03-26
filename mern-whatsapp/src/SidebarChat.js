import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from '@material-ui/core';
import './SidebarChat.css';

import db from './firebase';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt('Enter new room name.');
        
        if (roomName) {
            // something done in the database
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className='sidebarChat__info'>
                <h2>{name}</h2>
                <p>All caught up!</p>
            </div>
        </div>
        </Link>
    ) : (
      <div onClick={createChat}
      className="sidebarChat">
          <h2>Add New Chat</h2>
      </div>

    );
}

export default SidebarChat;
