import React from 'react';
import './Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from './SidebarChat';

function Sidebar() {
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
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar__chats'>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>

        </div>
    )
}

export default Sidebar;

