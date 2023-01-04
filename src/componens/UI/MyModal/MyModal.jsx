import React from 'react';
import { useState } from 'react';
import cl from './MyModal.module.css';


const MyModal = ({styles, children, title, visible, setVisible, nameModal, inf, click, nameButton}) => {

const style = {transition: '3s all ease', opacity:0}
const rootClasses = [cl.myModal]
if(visible && nameModal==inf){
rootClasses.push(cl.active)
style.opacity=1

}

return (
<div>
<button title={title} style={styles} onClick={click}>{nameButton}</button>
<div className={rootClasses.join(' ')} style={style} onClick={()=>setVisible(false)}>
<div className={cl.myModalContent} onClick={(e)=>e.stopPropagation()}>
<div>
{children}
</div>
</div>
</div>
</div>
);
};

export default MyModal;