import './Register.css'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate()

    const createUser = async ()=>{
        await Axios.post('http://localhost:3333/register', {
            Email: email,
            UserName: userName,
            Password: password
        }).then(()=>{
            console.log('front mandou dados')
            navigateTo('/')
        })        
    }

    return (
        <div className="container">
            <span className="material-symbols-outlined">wallet</span>
            <input id="email" type="text" className="input_user" placeholder="EMAIL" onChange={(e)=>{setEmail(e.target.value)}} />
            <input id="user" type="text" className="input_user" placeholder="USERNAME" onChange={(e)=>{setUserName(e.target.value)}}/>
            <input id="password" type="password" className="input_password" placeholder="PASSWORD" onChange={(e)=>{setPassword(e.target.value)}}/>
            <div className="container-btn-forgot">
                <button id="btn" type="submit" className="btn_login" onClick={createUser}>SIGN UP</button>
            </div>
        </div>
    )
}

export default Register