import React, { useTransition } from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import cl from './User.module.css'
import MyModal from "../componens/UI/MyModal/MyModal"
import { Link, useLocation } from "react-router-dom"
import ModalType from './modalType'
import {sort} from "../componens/mechanicals/sort"

const MyFiles = () => {
    const [post, setPost] = useState([]) 
    const [file, setFile] = useState([])
    const [fileName, setFileName] = useState('')
    document.title="Мои файлы"
    const [isPending, startTrasition] = useTransition()
    const [window1, setWindow1] = useState({type: '0', text: ""})
    const [folders, setFolders] = useState([])
    const location = useLocation('')
    const [nameFolder, setNameFolder] = useState('')
    const [noneFile, setNoneFile] = useState('')
    const [windowLocation, setWindowLocation] = useState('')
    const [query, setQuery] = useState('')
    const [modal, setModal] = useState('')
    const [nameModal, setNameModal] = useState('')

    if (location.search==''){
    window.location.href = 'myfiles?location=null';
    }



    const addFolder = async () => {
        const response = await axios.post('http://localhost:5001/api/cloud/addfolder',{
            email: jwt_decode(localStorage.getItem('token')).email,
            location: new URLSearchParams(location.search).get('location'),
            folder: nameFolder
        },
        {headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        )
        findFiles('Папка добавлена', '0.8')
    }
    
    const deleteFolders = async (folderHS)=>{

        const response = await axios.post('http://localhost:5001/api/cloud/deletefolder', {
            email: jwt_decode(localStorage.getItem('token')).email,
            location: folderHS,
        },
        {headers:{
             Authorization: `Bearer ${localStorage.getItem('token')}`
    }}
        )
        findFiles("Удалено", '0.8')
    }

    const find = async ()=>{

        const response = await axios.post('http://localhost:5001/api/cloud/find', {
            email: jwt_decode(localStorage.getItem('token')).email,
            query: query
        }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
        setPost(response.data[1].rows)
        setFolders(response.data[0].rows)
    }

    const openFile = async (file)=>{

        const response = await axios.post('http://localhost:5001/api/cloud/file', {
            email: jwt_decode(localStorage.getItem('token')).email,
            file: file,
            location: new URLSearchParams(location.search).get('location'),
        }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'multipart/form-data'
      }})
        
        if(response.data[1]=="jpg" || response.data[1]=="gif" || response.data[1]=="png" || response.data[1]=="jfif"){
            setWindowLocation(<img src={"data:image/png;base64,"+response.data[0]}></img>)
        }else if(response.data[1]=="mp4"){
            setWindowLocation(<video controls style={{height:"500px"}}  type='video/webm' src={"data:video/mp4;base64,"+response.data[0]}></video>)
        }else {
            setWindowLocation(response.data[0])
        }
    }


    const findFiles = async (messager, type)=>{

        const response = await axios.get('http://localhost:5001/api/cloud?email='+jwt_decode(localStorage.getItem('token')).email+'&location='+new URLSearchParams(location.search).get('location'),{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'multipart/form-data'
          }})
        
        if (response.data[1].count==0 && response.data[0].count==0){
            setNoneFile('Файлы и папки в директории не найдены!')
        }else{
            setNoneFile('')
        }
        setPost(response.data[1].rows)
        setFolders(response.data[0].rows)

        setWindow1({type:type, text: messager})
        
        setTimeout(()=>{
            setWindow1({type:'0', text: messager})
        }, 3000)

    }

    const addFiles = async ()=>{
        const response = await axios.post('http://localhost:5001/api/cloud', {
            email: jwt_decode(localStorage.getItem('token')).email,
            location: new URLSearchParams(location.search).get('location'),
            file: file,
            fileName: fileName
        },
        {headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
   }})
        findFiles('Добавлено', '0.8')
    }

    
    
    const deleteFiles = async (file)=>{
        
        const response = await axios.post('http://localhost:5001/api/cloud/delete', {
            email: jwt_decode(localStorage.getItem('token')).email,
            file: file,
            location: new URLSearchParams(location.search).get('location')
        },
        {headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
   }}
       )
       findFiles("Удалено", '0.8') 
    }

    const downloadFile = async (file, fileName) =>{
        const response = await fetch('http://localhost:5001/download?email='+jwt_decode(localStorage.getItem('token')).email+"&location="+new URLSearchParams(location.search).get('location')+'&file='+file,
    {headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
}})
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    }

    useEffect(()=>{
        startTrasition(()=>{findFiles()})
        setNoneFile('')
    }, [location])

    return(
        <div>
            <h1 className={cl.myFileH}>
                Мои файлы
                <br />
            </h1>

            <MyModal title={'Добавить файл/папку'} click={()=>{
        setModal(true)
        setNameModal('Modal3')}}
        styles={{display: 'none'}}
        nameButton={"+"} inf={nameModal} opacity={"1"}
        visible={modal} setVisible={setModal} 
        nameModal={'Modal3'} >
            {windowLocation}
        </MyModal>



            <div className={cl.message} style={{transition: '1s all ease', opacity: window1.type }}>
            {window1.text}
            
            </div>
            <div className={cl.buttons}>
                <select onChange={(e)=>{
                    setPost(sort(post, e.target.value))
                }}>
                   
                    <option value="" selected disabled>Сортировать</option>
                    <option >По новизне</option>
                    <option >По старости</option>
                    <option >По названию</option>
                    
                </select>
                <input placeholder="Поиск" onKeyDown={(e)=>{
                    if(e.key=="Enter"){
                        find()}}} onChange={(e)=>{
                    setQuery(e.target.value)
                }}/>  
                <button onClick={find}>
                    <img  src="https://cdn-icons-png.flaticon.com/512/4024/4024513.png" style={{height: '25px'}}/>
                </button>
                <ModalType addFolder={addFolder} addFiles={addFiles} onChange1={(e)=>{
        setNameFolder(e.target.value) 
    }} onChange2 = {(e)=>{
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }}></ModalType>
            </div>
            {isPending && <div className={cl.loading}></div> }
            <div className={cl.files}>
                {folders?.map(folders => (
                    <div className={cl.myFolders}>
                        <div className={cl.myFoldersDelete}>
                    <a  title="Удалить" onClick={()=>{
                    deleteFolders(folders.folderHS)
                    }}><img src="https://cdn-icons-png.flaticon.com/128/3156/3156999.png" style={{height: '25px'}}/></a>
                    <Link className={cl.linkFolder} to={'/myfiles?location='+folders.folderHS} onClick={()=>{
                        setWindowLocation(folders.folder)
                    }}></Link> 
                    </div>
                    <img style = {{height: '100px'}} src="https://cdn-icons-png.flaticon.com/128/3139/3139112.png" />
                    <br></br>
                    <p>{folders.folder}</p>
 
                </div>
                    ))}
                <br/>
                
            </div>
            <hr style={{width: '70%', color: 'green', background: 'green'}}></hr>       
            <div className={cl.files}>

                {noneFile}
            
                {post?.map(post => (
                <div className={cl.myFolders}>

                <div className={cl.myFoldersDelete}>
                <a  title="Открыть" onClick={()=>{openFile(post.file)
                 setModal(true)
                 setNameModal('Modal3')}} target="_blank" className={cl.linkFolderA}></a> 
                
                <div className={cl.icons}>
                <a title="Скачать" onClick={()=>{downloadFile(post.file, post.fileName)}} >
                         <img src="https://cdn-icons-png.flaticon.com/128/4233/4233095.png" style={{height: '25px'}}/>
                     </a>
                     
                     <a title="Удалить" onClick={()=>{
                     deleteFiles(post.file)
                     }}><img src="https://cdn-icons-png.flaticon.com/128/3156/3156999.png" style={{height: '25px'}}/></a>
                     </div>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/128/2965/2965335.png" style={{height: '80px'}}/>
                <br />
                     <p>{post.fileName}</p>
                </div>
                ))}
            </div>

        </div>
    )
} 

export default MyFiles