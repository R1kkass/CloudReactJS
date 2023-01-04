import React from "react";
import { useState } from "react";
import MyModal from '../componens/UI/MyModal/MyModal'
import cl from "../http/User.module.css"
import cll from "../http/modalType.module.css"


const ModalType = ({addFolder, addFiles, onChange1, onChange2}) =>{

    const [modal, setModal] = useState('')
    const [nameModal, setNameModal] = useState('')
    const [nameType, setNameType] = useState('Block')
    const [nameType2, setNameType2] = useState('none')

    const typeAdder = () => {
        setNameType('block')
        setNameType2('none')
    }

    const typeAdder2 = () => {
        setNameType2('block')
        setNameType('none')
    }
    
    return(
    <MyModal title={'Добавить файл/папку'} click={()=>{
        setModal(true)
        setNameModal('Modal1')}}
        nameButton={"+"} inf={nameModal}  opacity={"1"}
        visible={modal} setVisible={setModal} nameModal={'Modal1'} >
            <div className={cll.buttonsModal}>
              <button className={cl.btnAdd} onClick={typeAdder}>Добавить файл</button>
        <button className={cl.btnAdd} onClick={typeAdder2}>Добавить папку</button>
        </div>
        <div className={cl.contentModal}>
        <div style={{display: nameType}}>
        <div className={cl.contentModal}>
        <h1>Добавить файл</h1>
        <label>
            <input type="file" onChange={onChange2}>
            </input>
            
        </label>
        <br />
        <button  className={cl.btnAdd} style={{width: '120px', marginTop: '15px'}} onClick={addFiles} >Добавить {addFiles}</button>
        </div>
        </div>
        <div style={{display: nameType2}}>
        <h1>Добавить папку</h1>
    
    <input placeholder="Название папки" onChange={onChange1}/>
    <br></br>
    <button style={{width: '120px', height: '50px', marginTop: '35px'}} onClick={addFolder}>Добавить папку</button>
        </div>
      
        </div>
</MyModal>
    )
}

export default ModalType