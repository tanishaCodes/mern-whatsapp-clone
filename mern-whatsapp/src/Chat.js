import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';

import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css';

import db from './firebase';
import firebase from 'firebase';
import axios from './axios';


function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    // changes the room name in the  chat header to the respective room
    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => 
                    setRoomName(snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => 
                        doc.data()))
                );
        }
    }, [roomId]);

    // randomize avatars
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
     }, [roomId]);

    // prevents refresh with onClick for sent messages
    const sendMessage =  async (e) => {
        e.preventDefault();

        db.collection('rooms')
            .doc(roomId)
            .collection('messages').add({
                message: input,
                name: user.displayName, // coming from Google auth
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        setInput('');
        // };

     await axios.post('/messages/new', {
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        received: false,
        });

        setInput('');
        };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {''}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className='chat__headerRight'>
                <IconButton>
                   <SearchOutlined /> 
                </IconButton>
                <IconButton>
                   <AttachFile /> 
                </IconButton>
                <IconButton>
                   <MoreVert /> 
                </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className='chat__name'>{message.name}</span>
                            {message.message}
                        <span className='chat__timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Type a message'
                        type='text'
                     />
                    <button 
                    onClick={sendMessage}
                    type='submit'>
                        Send
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;