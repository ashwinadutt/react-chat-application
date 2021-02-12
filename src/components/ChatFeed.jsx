import MessageForm from './MessageForm'
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    const { userName, chats, activeChat, messages} = props;

    const chat = chats && chats[activeChat];

    if(!chat) return 'Loading...'

    const updateScroll = () => {
        var element = document.querySelector('.chat-feed');
        
        if(element)
            element.scrollTop = element.scrollHeight
    }

    console.log(chat);
    const renderMessages = () => {

        
    
        const keys = Object.keys(messages);

        const renderReadReceipts = (message, isMyMessage) => {  
            return chat.people?.map((person, index) => person.last_read === message.id && (
            <div 
                    key={`read_${index}`}
                    className='read-receipt'
                    style={{
                        float: isMyMessage ? 'right' : 'left',
                        backgroundImage: `url(${person?.person?.avatar})`
                    }}
                />               
            ));
        } 
        
        updateScroll();
        
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;
    
            
    
            return(
                <div key={`msg_${index}`} style={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage ? 
                            <MyMessage message={message} /> :
                            <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                            
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight : isMyMessage ? '18px' : '0', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        });
    }

    return (
        <div class="chat-feed">
            <div className='chat-title-container'>
                <div className='chat-tite'>{chat.title}</div>
                <div className='chat-subtitle'>
                    {chat.people.map(person => `${person.person.username} `)}
                </div>
                {renderMessages()}
                <div style={{height: '100px'}} /> 
                <div className='message-form-container'>
                    <MessageForm {...props} chatId={activeChat} chat={chat} />
                </div>
            </div>
        </div>
    )
}

export default ChatFeed
