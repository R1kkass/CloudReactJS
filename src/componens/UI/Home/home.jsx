import React from "react";
import jwt_decode from "jwt-decode"
import cl from  "./home.module.css"
import { Link } from "react-router-dom"

const Home = () => {
    document.title="Главная"

    return(
        <div className={cl.home}>
            <div className={cl.divOne}>
                <div>
                <h1>Простой и <br/>
                безопасный <br />
                доступ к файлам</h1>
                <h4>
                    Храните свои данные, и имейте доступ к ним с любого <br/>
                    устройства, не боясь за их безопасность.
                </h4>
                <Link className={cl.link} to="/myfiles?location=null">Начать работу с Cloud9</Link>
                <br/>
                <br/>
                <div className={cl.text}>
                <p>У вас нет аккаунта?</p>
                <Link className={cl.linkReg} to="/registration">Зарегистрироваться</Link>
                </div>
                </div>
                <div><img src="https://cdn.icon-icons.com/icons2/1852/PNG/512/iconfinder-cloudserver-4417106_116641.png" style={{width: '100%'}}/></div>
            </div>

        </div>
    )
}

export default Home