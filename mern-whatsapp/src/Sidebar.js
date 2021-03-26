import React, { useEffect, useState } from 'react';
import './Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from './SidebarChat';

import db from './firebase';

function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className='sidebar'>
           <div className='sidebar__header'>
               <Avatar src='https://avatars2.githubusercontent.com/u/67667273?s=460&u=2e28c4aee4dbee2c6404aeb7009aa9832bb0350e&v=4' />
            <div className='sidebar__headerRight'>
                <IconButton>
                   <DonutLargeIcon /> 
                </IconButton>
                <IconButton>
                   <ChatIcon /> 
                </IconButton>
                <IconButton>
                   <MoreVertIcon /> 
                </IconButton>
            </div>
           </div>

           <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search chat' type='text' />
                </div>
            </div>

            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {rooms.map(room => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    );
}

export default Sidebar;

