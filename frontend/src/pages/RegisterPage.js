import {useState} from "react"

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

   async function register(ev){
        ev.preventDefault();
       
       const response = await fetch('http://localhost:4000/register', {
            method:'POST',
            body: JSON.stringify({username,
                 password,
                 firstName,
                 lastName,
                 email,
                 confirmpassword,
                }),
            headers: {'Content-Type':'application/json'}
        })
        console.log(response);

        if (response.ok ){
            alert('registration successful')
        }else {
            alert('registration failed')

        }
    }
    return ( 

        <form className="register" onSubmit={register} >
        <input type="text" 
            placeholder="First Name" 
            value={firstName} 
            onChange={ev => setFirstname(ev.target.value)}/> 
            
        <input type="password" 
            placeholder="Last Name"
            value={lastName}
            onChange={ev => setLastname(ev.target.value)} /> 

        <input type="text" 
            placeholder="username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>  

        <input type="text" 
            placeholder="Email" 
            value={email} 
            onChange={ev => setEmail(ev.target.value)}/> 

        <input type="text" 
            placeholder="password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)}/> 

        <input type="text" 
            placeholder="Confirm Password" 
            value={confirmpassword} 
            onChange={ev => setConfirmpassword(ev.target.value)}/>                
        <button>Register</button>
    
    </form >
    
      );
}

export default RegisterPage;