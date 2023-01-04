import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cl from "./header.module.css";


const Header = ({children}) =>{

    const [auth, setAuth] = useState('')
    const location = useLocation('')
    const localhost = new URLSearchParams(location.search).get('location')
    const [btn, setBtn] = useState('')
    const exit = () =>{
        localStorage.clear()
    }
    
    let div;
    let [local, setLocal] = useState(localStorage.getItem('token'))
    
    const check = async ()=>{

        const response = await axios.post('http://localhost:5001/api/cloud/authcheck', {
            email: 'kto'
        }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
      }}
      )
      if(response.data.message=='ura'){
        setAuth( <img src="https://cdn-icons-png.flaticon.com/512/876/876779.png" onClick={()=>{
            exit()
            check()
        }} style={{height: '30px', marginTop: '-10px', marginRight: '20px'}}/>)
    }else{
        setAuth(<Link to="/login">Войти</Link>)
    }
    
    } 

    useEffect(()=>{
        check()
    }, [localhost])


    let wind = 0
    window.addEventListener('scroll', function() {
        
        var scrolled = window.pageYOffset;
        var scrollPrev = 0;

        if ( scrolled > 30 && scrolled > scrollPrev ) {
            
        } else {
            
        }
        scrollPrev = scrolled;
        if(this.window.pageYOffset>100){
            setBtn(<button onClick={()=>{
                this.window.scrollTo(0,0)
            }} className={cl.upBtn}>Вверх</button>)
        }else{
            setBtn('')
        }
        
      });

        return(
               <div>
            
            <div className={cl.content}>
                <div style={{display: 'flex'}} className={cl.header}>
                    
                <div className={cl.headerContent}>
                <div>
                <p><Link to="/"><img src="https://cdn-icons-png.flaticon.com/128/252/252035.png" height={'35px'}/>Cloud9</Link></p>
                </div>
                <div>
                
                <Link to="/myfiles?location=null">Мои файлы</Link>
                </div> 
                </div>
                <div className={cl.exit} onClick={exit}>
                   
                </div>
                <div className={cl.headerImg}>
                    {auth}
                </div>

                </div>
                {btn}
                {children}
            </div>
            <div className={cl.footer}>О нас</div>
        </div>
        )
    }


export default Header