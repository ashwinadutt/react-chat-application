import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import LoginForm from './components/LoginForm'

import './App.css'
import ChatFeed from './components/ChatFeed'

const App = () => {
    if(!localStorage.getItem('username'))
        return <LoginForm />

    return (
        <ChatEngine 
            height="100vh"  
            projectID="284753ae-2ce3-498b-bab3-02cfeb839974"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
        />
    )
}

export default App
