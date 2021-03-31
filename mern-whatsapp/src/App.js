import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';

import './App.css';
import './Chat.css';

import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'

import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  // const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);

  // Axios for the fetch
  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('5a408a6fb35686c708d0', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // messages are coming in through here
      // alert(JSON.stringify(newMessage)); (this pops ups an alert to see test if message is going through)
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (

      <div className='app__body'>
      <Router>
        <Sidebar /> 

        <Switch>
          <Route path='/rooms/:roomId'>
            <Chat />
          </Route>
          <Route path='/'>
            <Chat messages={messages} />
          </Route>
        </Switch>
      </Router> 
      </div>
      )}
    </div>
  );
}

export default App;
