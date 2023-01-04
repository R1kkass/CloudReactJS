import React from "react";
import cl from "./MyInput.module.css"

const MyInput = ({placeholder, type, onChange}) => {
    return(  
        <input type={type} placeholder={placeholder} onChange={onChange} className={cl.myInput}/>
    )

}

export default MyInput