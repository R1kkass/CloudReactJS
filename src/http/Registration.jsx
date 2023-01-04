import React from "react";
import { useState } from "react";
import axios from 'axios'
import cl from "./User.module.css"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom"

const Login = () => {
    const [error, setError] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

    document.title="Регистрация"

    async function registration() {
        const response = await axios.post('http://localhost:5001/api/user/registration',{
            email:login, 
            password: password,
            role: role
        })
        .then(function (response, config) {
            setError('')
            console.log('fd')
            return jwt_decode(response.data.token)
            
          })
          .catch(function () {
            setError('Неверный логин или пароль')
        })  
    } 
    
    // console.log(jwt_decode(localStorage.getItem('token')))
    
    if (true){
    return(
        <div className={cl.user}>
            <div className={cl.windowsLogin}>
                <div className={cl.window}>
                    <h1>Регистрация</h1>
                    <input placeholder="Логин" className={cl.inp} onChange={(e)=>{
                        setLogin(e.target.value)
                    }}></input>
                    <br></br>
                    <input placeholder="Пароль" className={cl.inp} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                    <br></br>
                    <button onClick={registration} className={cl.btn}>Зарегестрироваться</button>
                    <div>{error}</div>
                </div>
            </div>
        </div>
    )
}
else{
    return(
        <div className={cl.user}>
        <div className={cl.windowsLogin}>
            <div className={cl.window}>
                <br></br>
                <h1>Вы аторизованы</h1>
                <h1><Link className={cl.Link} to="/">Вернуться на главную</Link></h1>
            </div>
        </div>
    </div>
    )
}
}

export default Login