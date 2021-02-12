import {useState} from 'react'
import axios from 'axios'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //create auth object
        const authObject = {
            'Project-ID': '284753ae-2ce3-498b-bab3-02cfeb839974',
            'User-Name': username,
            'User-Secret': password
        }

        try{
            await axios.get('https://api.chatengine.io/chats', { headers: authObject});

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        }
        catch(error)
        {
            setError('Seems like you have entered invalid credentials...')
        }
    }
    
    return(
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>React Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={username} onChange={(e => setUsername(e.target.value))} required className='input' placeholder='Username' />
                    <input type='password' value={password} onChange={(e => setPassword(e.target.value))} required className='input' placeholder='Password' />
                    <div align='center'>
                        <button type='submit'  className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
        
    );
}

export default LoginForm