import './Login.css'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login () {
    const [loginUserName, setLoginUserName]= useState('')
    const [loginPassword, setLoginPassword]= useState('')
    const navigateTo = useNavigate()

    

    const useLogin =  (e)=>{
        e.preventDefault();
        Axios.post('http://localhost:3333/',{
            loginUserName: loginUserName,
            loginPassword: loginPassword,
        }).then((response)=>{
                window.alert(response.data.message);
                navigateTo('/carteira');
        }).catch((error)=>{
            switch(error.response.status){
                case 401:
                    window.alert(error.response.data.message);
                    break;
                case 404:
                    window.alert(error.response.data.message);
                    break;
                default:
                    window.alert(error.response);
                    break;
            }
        })
    }
    return(
        <div className="container">
            <span className="material-symbols-outlined">wallet</span>
            <input id="user" type="text" className="input_user" placeholder="USERNAME" onChange={(e)=>{setLoginUserName(e.target.value)}}/>
            <input id="password" type="password" className="input_password" placeholder="PASSWORD" onChange={(e)=>{setLoginPassword(e.target.value)}} />
            <div className="container-btn-forgot">
                <button id="btn" type="submit" className="btn_login" onClick={useLogin}>LOGIN</button>
                <a href="/register" className="forgot">Don't have an account? Sign Up</a>
            </div>
        </div>
    )
}

export default Login