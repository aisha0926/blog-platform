import {  useState } from 'react';


export default function LoginPage ( ) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message, setMessage] = useState('');
     function login(ev) {
        ev.preventDefault();
          fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type':'application/json'},
          credentials:'include',
        })
        .then((response) => response.json())
        .then((data) => {
            
        
        if (data.success) {
          setMessage('Login successful');
         
        } else {
          setMessage(data.message || 'Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        setMessage('An error occurred while logging in.');
        console.error('Error:', error);
      });
    }  
    
    return(
        <form className='login' onSubmit={login} >
            <h1>Login</h1>
            <input type='text'
                    placeholder='username'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}/>
            <input type='password'
                    placeholder='password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
            />
            <button> Login </button>
            
         </form>

        
    )
}